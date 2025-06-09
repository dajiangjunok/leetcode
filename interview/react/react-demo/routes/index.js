import Home from "@/pages/home"
import About from "@/pages/about"
import Counter from '@/pages/counter'
import Form from "@/pages/form/Form"

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }, {
    path: '/counter',
    name: 'counter',
    component: Counter
  }, {
    path: '/form',
    name: 'form',
    component: Form
  },

]

export default routes