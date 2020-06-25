import {
  defaultImgUrl,
  defaultProbelUrl,
} from '~/utils/constant';

export default function getScript(baseConfigJSON, specialConfig, id) {
    const {
        alias = '__fw',
        ratio = '1',
        // isAsync = '0',
        probelUrl = defaultProbelUrl,
        imgUrl = defaultImgUrl,
    } = JSON.parse(specialConfig || '{}');
    return [
        `<script>`,
        `!function(a,b,c,d,e){`,
        `a[c]||(a[c]={});a[c].config={base:'${baseConfigJSON}',`,
        `id:'${id || '--------------'}',alias:'${alias}',ratio:${ratio},probelUrl:b,imgUrl:e};`,
        `with(document)write('<script src="'+b+'" crossorigin><\\/script>');`,
        `a[d]=a[c], (d!==c)&&delete a[c];`,
        `}(window,'${probelUrl}','__fw','__fw','${imgUrl}')`,
        `</script>`,
    ];
}
