declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '@/components/UserNavbar.vue'
declare module '@/components/ui/MainHeader.vue'
declare module '@/plugins/axios'
