// !function () {

// }

// !(function(c,b,d,a){
//   c[a]||(c[a]={});
//   c[a].config={
//     pid:"fhqgra89cy@0fd0b9e17c92905",
//     appType:"web",
//     imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",
//     behavior:true,
//     useFmp:true,
//     enableSPA:true,
//     enableLinkTrace:true,
//     sendResource:true
//   };
//   with(b) {
//     with(body) {
//       with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
//     }
//   }

// })(window,document,"https://retcode.alicdn.com/retcode/bl.js","__bl");

export default function getScript(baseConfigJSON, specialConfig) {
    const {
        alias = '__fw',
        ratio = '1',
        // isAsync = '0',
        probelUrl = 'http://localhost:3007/static/js/bundle.js',
    } = JSON.parse(specialConfig || '{}');
    return [
        `<script>`,
        `!function(a,b,c,d){`,
        `a[c]||(a[c]={});a[c].config={base:'${baseConfigJSON}',`,
        `alias:'${alias}',ratio:${ratio},probelUrl:'${probelUrl}'};`,
        `whith(document)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=b);`,
        `a[d]=a[c], (d!==c)&&delete a[c];`,
        `}(window,'a.js','__fw','__fw')`,
        `</script>`,
    ];
}
