import { supabaseDB } from "../api.js";
import { escapeHTML } from "./escapeHTML.js";
import { hideLoader, showLoader } from "./loader.js";

export async function questionsList() {
    const questionsSection = document.querySelector('#questions .accordion')
const loader = showLoader(questionsSection);
    try {
        const{data: questions, error} = await supabaseDB
        .from('questions')
        .select('title, description')
        .order('id', {ascending: true})
        if (error) throw error;

        //Очищаем контейнер перед добавлением новых элементов
        questionsSection.innerHTML = ''
        questions.forEach(question =>{
            const accordionItem = document.createElement('li')
            accordionItem.className = 'accordion__item'
            accordionItem.innerHTML = `
            <button class="accordion__btn btn-reset">
            <span class="accordion__text">${escapeHTML(question.title)}</span>
            <span class="accordion__icon"></span>
            </button>
            <div class="accordion-box">
            <p class="accordion-box__text">${escapeHTML(question.description)}</p>
            </div>`

            
            questionsSection.append(accordionItem)
        })
        hideLoader(loader);
    } catch (error) {
        hideLoader(loader);
        console.error('Ошибка при загрузке услуги:', error)
        questionsSection.innerHTML = '<li>Не удалось загрузить услуги. Пожалуйста, попробуйте позже.</li>'
    }
}