<template>
  <div class="container">
    <Accordion class="mb-4">
      <AccordionTab header="Добавить">
        <div class="p-fluid grid">
          <div class="field col-12 md:col-4">
              <span class="p-float-label">
                  <InputText id="inputtext" type="text" v-model="clientData.car" />
                  <label for="inputtext">Марка</label>
              </span>
          </div>
          <div class="field col-12 md:col-4">
              <span class="p-float-label">
                  <InputText id="inputtext" type="text" v-model="clientData.model" />
                  <label for="inputtext">Модель</label>
              </span>
          </div>
          <div class="field col-12 md:col-4">
              <span class="p-float-label">
                  <InputText id="inputtext" type="text" v-model="clientData.year" />
                  <label for="inputtext">Год выпуска ТС</label>
              </span>
          </div>

        </div>
        <div class="p-fluid grid">
          <div class="field col-12 md:col-4">
              <span class="p-float-label">
                  <InputText id="inputtext" type="text" v-model="clientData.vin" />
                  <label for="inputtext">VIN</label>
              </span>
          </div>
          <div class="field col-12 md:col-4">
              <span class="p-float-label">
                  <InputText id="inputtext" type="text" v-model="clientData.number" />
                  <label for="inputtext">Гос номер</label>
              </span>
          </div>
          <div class="field col-12 md:col-4">
              <span class="p-float-label">
                  <InputText id="inputtext" type="text" v-model="clientData.owner" />
                  <label for="inputtext">Имя владельца</label>
              </span>
          </div>

        </div>
        <div class="p-fluid grid">
          <div class="field col-12 md:col-6">
              <span class="p-float-label">
                  <Textarea id="inputtext" type="text" v-model="clientData.phones" />
                  <label for="inputtext">Телефоны для связи</label>
              </span>
          </div>
          <div class="field col-12 md:col-6">
              <span class="p-float-label">
                  <Textarea id="inputtext" type="text" v-model="clientData.need_to_repare" />
                  <label for="inputtext">Жалобы клиента</label>
              </span>
          </div>
          <div class="field col-12 ">
              <span class="p-float-label">
                <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name"  class="w-full" />
                  <label for="inputtext">Катерория проведенных работ</label>
              </span>
          </div>
          <div v-if="selectedCategory" class="field col-12 ">

              <span class="p-float-label">
               <MultiSelect v-model="selectedTypes" :options="selectedCategory.types" optionLabel="name" placeholder="Select Cities"
                            :maxSelectedLabels="3" class="w-full " >
                 <template #option="slotProps">
        <div class="flex align-items-center">
            <div>{{ slotProps.option.name }}</div> -
            <div>{{ slotProps.option.norma }}</div>
        </div>
    </template>
               </MultiSelect>

                  <label for="inputtext">Типы проведенных работ</label>
              </span>
          </div>

        </div>
        <div class="">Стоимость работ: {{totalNorma}} руб</div>
        <div class="p-fluid grid">
          <div class="field col-12 md:col-4">
              <span class="p-float-label">
                  <Calendar id="inputtext" type="text" v-model="clientData.date_come" />
                  <label for="inputtext">Дата обращения клиента</label>
              </span>
          </div>
          <div class="field col-12 md:col-4">
              <span class="p-float-label">
                  <Calendar id="inputtext" type="text" v-model="clientData.date_ready" />
                  <label for="inputtext">Дата ремонта</label>
              </span>
          </div>
          <div class="field col-12 md:col-4">
              <span class="p-float-label">
                  <Textarea id="inputtext" type="text" v-model="clientData.notes" />
                  <label for="inputtext">Замечания</label>
              </span>
          </div>

        </div>
        <Button :loading="is_loading" label="Добавить" @click="addClient"/>

      </AccordionTab >

    </Accordion>
    <Accordion class="accordion-custom" >
      <AccordionTab v-for="client in clients" :key="client.id">
        <template #header>
          <span>№{{client.id}}</span>
          <span>{{client.car}}</span>
          <span>{{client.number}}</span>
          <span>{{client.date_come}}</span>
          <span>{{client.owner}}</span>
          <span>{{client.phones}}</span>
          <span></span>
        </template>
        1. Марка :{{client.car}}<br>
        2. Модель : {{client.model}}<br>
        3. Год выпуска ТС : {{client.year}}<br>
        4. VIN : {{client.vin}}<br>
        5. Гос номер : {{client.number}}<br>
        6. Имя владельца : {{client.owner}}<br>
        7. Телефоны для связи : {{client.phones}}<br>
        8. Жалобы клиента : {{client.need_to_repare}}<br>
        9. Проведенные работы : {{client.done_work}}<br>
        10. Дата обращения клиента : {{client.date_come}}<br>
        11. Дата ремонта : {{client.date_ready}}<br>
        12. Замечания : {{client.notes}}<br>

      </AccordionTab>

    </Accordion>
  </div>
</template>
<script  setup>
const runtimeConfig = useRuntimeConfig();
const APIURL = runtimeConfig.public.apiUrl
const selectedCategory = ref(null)
const selectedTypes = ref(null)
const clients = ref(null)
const categories = ref(null)
const is_loading = ref(false)
const {data:response} = await useFetch(`${APIURL}/data/clients`)
const {data:response1} = await useFetch(`${APIURL}/data/categories`)
clients.value=response.value
categories.value=response1.value

const clientData = reactive({
  car:null,
  model:null,
  year:null,
  vin:null,
  number:null,
  owner:null,
  phones:null,
  need_to_repare:null,
  done_work:null,
  date_come:null,
  date_ready:null,
  notes:null,
})

const totalNorma = computed(()=>{
  let totalH = 0
  if (selectedTypes.value){
    selectedTypes.value.forEach((el)=>{
      totalH += parseFloat(el.norma)
    })

  }
  return parseFloat(totalH * 1200).toFixed(2)
})

const addClient = async () => {
  is_loading.value = true
  let temp_date = new Date(clientData.date_come).toLocaleDateString().split('.')
  clientData.date_come = `${temp_date[2]}-${temp_date[1]}-${temp_date[0]}`
  temp_date = new Date(clientData.date_ready).toLocaleDateString().split('.')
  clientData.date_ready = `${temp_date[2]}-${temp_date[1]}-${temp_date[0]}`
  await $fetch( `${APIURL}/data/client`, {
    method: 'POST',
    body: clientData
  } );
  const {data:response} = await useFetch(`${APIURL}/data/clients`)
  clients.value=response.value
  is_loading.value = false
}

</script>
<style lang="sass">
.container
  max-width: 1200px
  margin: 0 auto
.p-accordion-header-link
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 4fr
</style>