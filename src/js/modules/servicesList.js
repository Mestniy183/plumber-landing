
import { supabaseDB } from "../api.js";
import { escapeHTML } from "./escapeHTML.js";
import { hideLoader, showLoader } from "./loader.js";

export async function servicesList() {
    const servicesSection = document.querySelector('#services .accordion')
    const loader = showLoader(servicesSection);
    try {
        const{data: services, error} = await supabaseDB
        .from('services')
        .select('title, description')
        .order('id', {ascending: true})
        if (error) throw error;

        //Очищаем контейнер перед добавлением новых элементов
        servicesSection.innerHTML = ''
        services.forEach(service =>{
            const accordionItem = document.createElement('li')
            accordionItem.className = 'accordion__item'
            accordionItem.innerHTML = `
            <button class="accordion__btn btn-reset">
            <span class="accordion__text">${escapeHTML(service.title)}</span>
            <span class="accordion__icon"></span>
            </button>
            <div class="accordion-box">
            <p class="accordion-box__text">${escapeHTML(service.description)}</p>
            </div>`

            
            servicesSection.append(accordionItem)
        })
        hideLoader(loader);
    } catch (error) {
        hideLoader(loader);
        console.error('Ошибка при загрузке услуги:', error)
        servicesSection.innerHTML = '<li>Не удалось загрузить услуги. Пожалуйста, попробуйте позже.</li>'
    }
}