

import { escapeHTML } from "./escapeHTML.js";
import { hideLoader, showLoader } from "./loader.js";
import  servicesData from '../../json/services.json';

export async function servicesList() {
    const servicesSection = document.querySelector('#services .accordion')
    const loader = showLoader(servicesSection);
    try {
       const services = servicesData;
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