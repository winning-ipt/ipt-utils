import Occupation from '../Occupation'

Occupation.install = (Vue) => {
  Vue.component(Occupation.name, Occupation)
}

window.Vue && window.Vue.use(Occupation)

export default Occupation

