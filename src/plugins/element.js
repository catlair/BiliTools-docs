import Vue from 'vue';
import {
    Button,
    TimePicker,
    Switch,
    Transfer,
    Input,
    InputNumber,
    Col,
    Row,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Option,
    Select,
    Container,
    Submenu,
    Menu,
    MenuItemGroup,
    MenuItem,
    Notification,
    Header,
    MessageBox,
    Divider, Table, TableColumn, Card, Message
} from 'element-ui';

import CollapseTransition from '../../node_modules/element-ui/lib/transitions/collapse-transition';

Vue.component('el-collapse-transition', CollapseTransition)

// Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 };
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert

Vue.use(Button);
Vue.use(TimePicker);
Vue.use(Transfer);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Switch);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Menu)
Vue.use(Container)
Vue.use(Submenu)
Vue.use(Header)
Vue.use(Divider)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
