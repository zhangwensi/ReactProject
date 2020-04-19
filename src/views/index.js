import Loadable from  'react-loadable'

import {
  Loading
} from '../components'


const Aritcle = Loadable({
    loader:()=> import('./Aritcle'),
    loading: Loading
})

const Dashbroad = Loadable({
    loader:()=> import('./Dashborad'),
    loading: Loading
})

const Login = Loadable({
    loader:()=> import('./Login'),
    loading: Loading
})

const NotFond = Loadable({
    loader:()=> import('./NotFond'),
    loading: Loading
})

const Edit = Loadable({
    loader:()=> import('./Aritcle/Edit'),
    loading: Loading
})


export {
    Aritcle,
    Dashbroad,
    Login,
    NotFond,
    Edit
}