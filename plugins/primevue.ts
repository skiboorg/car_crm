
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import Textarea from 'primevue/textarea'

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast'
import MultiSelect from 'primevue/multiselect'
import Dropdown from 'primevue/dropdown'
import ToastService from 'primevue/toastservice'

import 'primeicons/primeicons.css'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, {
        ripple: true,
        locale:{
            firstDayOfWeek: 1,
            dateFormat: 'dd/mm/yy',
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ'],
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Toast', Toast)
    nuxtApp.vueApp.component('Textarea', Textarea)
    nuxtApp.vueApp.component('Accordion', Accordion)
    nuxtApp.vueApp.component('AccordionTab', AccordionTab)
    nuxtApp.vueApp.component('Calendar', Calendar)
    nuxtApp.vueApp.component('MultiSelect', MultiSelect)
    nuxtApp.vueApp.component('Dropdown', Dropdown)


    return {
        provide: {
            toast: nuxtApp.vueApp.config.globalProperties.$toast
        }
    }
})