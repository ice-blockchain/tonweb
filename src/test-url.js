const IonWeb = require("./index");

console.log(IonWeb.utils.formatTransferUrl('EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG'))
console.log(IonWeb.utils.formatTransferUrl('EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG', '12300000000'))
console.log(IonWeb.utils.formatTransferUrl('EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG', '12300000000', 'hello'))
console.log(IonWeb.utils.formatTransferUrl('EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG', '12300000000', 'https://ion.org'))
console.log(IonWeb.utils.formatTransferUrl('EQBvI0aFLnw2QbZgjMPCLRdtRHxhUyinQudg6sdiohIwg5jL', undefined, ' ?&'))

console.log(IonWeb.utils.parseTransferUrl('ion://transfer/EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG'));
console.log(IonWeb.utils.parseTransferUrl('ion://transfer/EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG?amount=12300000000'));
console.log(IonWeb.utils.parseTransferUrl('ion://transfer/EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG?amount=12300000000&text=hello'));
console.log(IonWeb.utils.parseTransferUrl('ion://transfer/EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG?amount=12300000000&text=https%3A%2F%2Fion.org'));
console.log(IonWeb.utils.parseTransferUrl('ion://transfer/EQBvI0aFLnw2QbZgjMPCLRdtRHxhUyinQudg6sdiohIwg5jL?text=%20%3F%26'));
console.log(IonWeb.utils.parseTransferUrl('ion://transfer/EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG?amount=123.3'));


