export interface IBrandDropDown {
    id:string;
    name:string;
    link:string;
}
export const BRAND_DROPDOWN_MENU:IBrandDropDown[]=[
    {
        id:"1",
        name:"Profile",
        link:"/profile"
    },
    {
        id:"2",
        name:"Lists",
        link:"/lists"
    },
    {
        id:"3",
        name:"Billing",
        link:"/billing"
    },
    {
        id:"4",
        name:"Account",
        link:"/account"
    },
]
