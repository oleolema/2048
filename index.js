var main = {
    //创建一个二维数组
    createArray2: (m, n, init = 0) => {
        let arr = [];
        for (let i = 0; i < m; i++) {
            arr[i] = [];
            for (let j = 0; j < n; j++) {
                arr[i][j] = {};
                Object.assign(arr[i][j], init);
            }
        }
        return arr;
    },
    //生成（a,b）区间的随机整数
    randomInt: (a, b) => {
        return Number.parseInt(Math.random() * (b - a) + a);
    },
    //在dom上添加一个class
    addClass: (ele, clazz) => {
        let cla = ele.className;
        let regexp = new RegExp('(\\s+|^)' + clazz + '(\\s+|$)', 'g');
        if (cla.search(regexp) === -1) {
            ele.className += " " + clazz;
        }
    },
    //在dom上删除一个class
    delClass: (ele, clazz) => {
        let cla = ele.className;
        let regexp = new RegExp('(\\s+|^)' + clazz + '(\\s+|$)', 'g');
        ele.className = cla.replace(regexp, ' ');
    },
    //获取color的相对颜色
    getConTrastColor: (color) => {
        let r, g, b;
        let k = 60;
        if (color.startsWith('rgb')) {
            [r, g, b] = color.match(/\d+/g).map(item => Number.parseInt(item));
        } else if (color.startsWith('#')) {
            let cs = [undefined, r, g, b] = color.match(/#(..)(..)(..)/);
            [r, g, b] = [r, g, b].map(item => Number.parseInt(item, 16));
        }
        a = k * 3 / (r + g + b);
        [ar, ag, ab] = [a * r, a * g, a * b];
        [r, g, b] = [r - ar, g - ag, b - ab].map(item => Number.parseInt(item));
        return {
            color: `rgb(${r},${g},${b})`,
            rgb: [r, g, b],
        };
    },
    //获取当前设备系统
    os: (function () {
        var ua = navigator.userAgent,
            isWindowsPhone = /(?:Windows Phone)/.test(ua),
            isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
            isAndroid = /(?:Android)/.test(ua),
            isFireFox = /(?:Firefox)/.test(ua),
            isChrome = /(?:Chrome|CriOS)/.test(ua),
            isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
            isPhone = /(?:iPhone)/.test(ua) && !isTablet,
            isPc = !isPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isPhone: isPhone,
            isAndroid: isAndroid,
            isPc: isPc
        };


    })(),
}
main.replaceClass = (ele, clazz1, clazz2) => {
    main.delClass(ele, clazz1);
    main.addClass(ele, clazz2);
};
// alert(main.os.isPc)