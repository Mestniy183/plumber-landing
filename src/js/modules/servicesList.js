import { supabaseDB } from "../api.js";

export async function servicesList() {
    const servicesSection = document.querySelector('#services .accordion')

    try {
        const{data: services, error} = await supabaseDB
        .from('services')
        .select('title, description')
        .order('id', {ascending: true})
    } catch (error) {
        console.error('Ошибка при загрузке услуги:', error)
        servicesSection.innerHTML = '<li>Не удалось загрузить услуги. Пожалуйста, попробуйте позже.</li>'
    }
}