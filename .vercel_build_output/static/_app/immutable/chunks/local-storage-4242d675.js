var p=(e=>(e.Language="app::lang",e.Theme="app::theme",e.SidebarStatus="app::sidebar::status",e.SelectedClientApp="app::client_app::selected",e.SelectedChatbot="app::chatbot::selected",e))(p||{});function s(e,t=!0){const n=localStorage.getItem(e.toString());return n&&t?JSON.parse(n||"{}"):n}function a(e,t){t!=null&&localStorage.setItem(e.toString(),JSON.stringify(t))}export{p as L,s as g,a as s};
