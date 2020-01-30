class Calculate {

    tiemr1 = 1;
    score = {
        val: 0,
        ele: document.querySelector('.score'),
    };

    constructor(table) {
        this.table = table;
        this.animation = new Animation(table);
        this.score.ele.innerHTML = this.score.val;
    }

    // //合并两个元素
    // marginTowBox = (box1, box2) => {
    //     box1 = {
    //         ...box1,
    //         val: box1.val + box2.val,
    //         color: Animation.getColor(box1.val + box2.val),
    //     };
    //     box2 = {
    //         ...box2,
    //         val: 0,
    //         color: Animation.getColor(0),
    //     };

    //     // main.delClass(box2.ele, `pos${box2.y}-${box2.x}`);
    //     // main.addClass(box2.ele, `pos${box1.y}-${box1.x}`);
    //     //console.info(box2);
    //     // box2 = {
    //     //     ...box2,
    //     //     x: box1.x,
    //     //     y: box1.y,
    //     // }
    //     this.table[box1.y][box1.x] = box1;
    //     this.table[box2.y][box2.x] = box2;
    // };

    //合并两个元素
    marginTowBox = (box1, box2) => {
        let {
            x: box1X,
            y: box1Y
        } = box1;

        let {
            x: box2X,
            y: box2Y
        } = box2;

        let box1Val = box1.val;

        box2 = {
            ...box2,
            val: box1.val + box2.val,
            x: box1X,
            y: box1Y,
        };
        box1 = {
            ...box1,
            val: 0,
            x: box2X,
            y: box2Y,
        };


        main.replaceClass(box2.ele, 'noTransition', 'transition');

        main.replaceClass(box2.ele, `pos${box2Y}-${box2X}`, `pos${box1Y}-${box1X}`);

        main.replaceClass(box1.ele, `pos${box1Y}-${box1X}`, `pos${box2Y}-${box2X}`);
        //console.info(main.create)
        if (box1Val !== 0) {
            this.score.val += box2.val;
            this.score.ele.innerHTML = this.score.val;

            // setTimeout(() => {
            //     //box2.ele.style.transform = `scale(1.2)  translate3d(${box1X * main.create.size.colW}px,${box1Y * main.create.size.colH}px,0)`;

            //     setTimeout(() => {
            //         // box2.ele.style.transform = ``;
            //     }, 50);

            // }, 100);
            // setTimeout(() => {
            //     box2.ele.style.backgroundColor = "red";
            //     setTimeout(() => {
            //         box2.ele.style.backgroundColor = Animation.getColor(box2.val);
            //     }, 50);
            // }, 200);
            let fs = main.create.media.fontSize;
            setTimeout(() => {
                box2.ele.style.fontSize = `${fs + 2}em`;
                setTimeout(() => {
                    box2.ele.style.fontSize = `${fs}em`;
                }, 100);

            }, 150);
        }



        clearTimeout(this.tiemr1);
        this.timer1 = setTimeout(() => {
            main.replaceClass(box2.ele, 'transition', 'noTransition');
        }, 300);

        //console.info(box2.val);
        this.table[box1Y][box1X] = box2;
        // this.table[box2Y][box2X] = box1;
        main.create.add(box1);
    };

    //检查是否可以移动
    checkCanMove = () => {
        let t = this.table;
        //横向检查
        for (let i = 0; i < t.length; i++) {
            //有0可以移动
            if (t[i][0].val === 0) {
                return true;
            }
            for (let j = 1; j < t[i].length; j++) {
                //有0可以移动
                if (t[i][j].val === 0) {
                    return true;
                }
                //两个相邻元素相同可以移动
                if (t[i][j - 1].val === t[i][j].val) {
                    return true;
                }
            }
        }
        //纵向检查
        for (let i = 0; i < t.length; i++) {
            if (t[0][i].val === 0) {
                return true;
            }
            for (let j = 1; j < t[i].length; j++) {
                if (t[j][i].val === 0) {
                    return true;
                }
                if (t[j - 1][i].val === t[j][i].val) {
                    return true;
                }
            }
        }
        return false;
    };

    foreach = (fun) => {
        for (let i = 0; i < this.table.length; i++) {
            for (let j = 0; j < this.table[i].length; j++) {
                fun(this.table[i][j], i, j);
            }
        }
    }

    createRandomBox = () => {
        let list = [];
        this.foreach((item, i, j) => {
            if (item.val === 0) {
                list.push(item);
            }
        });
        if (list.length === 0) {
            return;
        }
        list = list.sort(() => Math.random() - 0.5);
        let randomList = [list[0]];
        if (list[1]) {
            randomList.push(list[1]);
        }
        for (let i = 0; i < randomList.length; i++) {
            randomList[i] = {
                ...randomList[i],
                val: 2,
                color: Animation.getColor(2),
            }
        }

        main.create.reload(randomList);

        return randomList;
    }


    marginUp = () => {
        let t = this.table;
        let k = 0;
        //遍历每一列
        for (let i = 0; i < t.length; i++) {
            //k指向每一列的第一个数
            k = 0;
            //j指向k后一个数， 寻找j能与k合并的数
            for (let j = k + 1; j < t[i].length && k < t[i].length - 1; j++) {
                //0 不能合并， k 指向的值不能为0，k指向下一个数
                if (t[k][i].val === 0) {
                    k++;
                    j = k;
                    continue;
                }
                //寻找到k与j相同的数字，合并两个相同的元素,每个元素只能合并一次，k++
                if (t[k][i].val === t[j][i].val) {
                    this.marginTowBox(t[k][i], t[j][i]);
                    k++;
                    j = k;
                }
                //中途遇到其他非0数字，当前k 不能被合并，k++
                else if (t[j][i].val !== 0) {
                    k++;
                    j = k;
                }
            }
        }
        //合并完成后会留下空格，用后面的元素填补前面的空格
        for (let i = 0; i < t.length; i++) {
            //k指向第一个元素（k指向0元素）
            k = 0;
            //j指向k的下一个 （j指向非0元素），用j填补k
            for (let j = k + 1; j < t[i].length && k < t[i].length - 1; j++) {
                //k寻找0
                if (t[k][i].val !== 0) {
                    k++;
                    j = k;
                    continue;
                }
                //j寻找非0
                if (t[j][i].val !== 0) {
                    this.marginTowBox(t[k][i], t[j][i]);
                    k++;
                    j = k;
                }
            }
        }
        return t;
    }


    marginDown = () => {
        let t = this.table;
        let k = this.table.length - 1;
        for (let i = t.length - 1; i >= 0; i--) {
            k = this.table.length - 1;
            for (let j = k - 1; j >= 0 && k >= 1; j--) {
                //0 不能合并， k 指向的值不能为0
                if (t[k][i].val === 0) {
                    k--;
                    j = k;
                    continue;
                }
                //合并两个相同的元素,每个元素只能合并一次，k++
                if (t[k][i].val === t[j][i].val) {
                    this.marginTowBox(t[k][i], t[j][i]);
                    k--;
                    j = k;

                }
                //遇到其他非0数字，k 不能被合并，k++
                else if (t[j][i].val !== 0) {
                    k--;
                    j = k;
                }
            }
        }
        for (let i = t.length - 1; i >= 0; i--) {
            k = this.table.length - 1;;
            for (let j = k - 1; j >= 0 && k >= 1; j--) {
                //0 不能合并， k 指向的值不能为0
                if (t[k][i].val !== 0) {
                    k--;
                    j = k;
                    continue;
                }

                if (t[j][i].val !== 0) {
                    this.marginTowBox(t[k][i], t[j][i]);
                    k--;
                    j = k;
                }
            }
        }
        //console.info(t);
        return t;
    }

    marginLeft = () => {
        let t = this.table;
        let k = 0;
        for (let i = 0; i < t.length; i++) {
            k = 0;
            for (let j = k + 1; j < t[i].length && k < t[i].length - 1; j++) {
                //0 不能合并， k 指向的值不能为0
                if (t[i][k].val === 0) {
                    k++;
                    j = k;
                    continue;
                }
                //合并两个相同的元素,每个元素只能合并一次，k++
                if (t[i][k].val === t[i][j].val) {
                    this.marginTowBox(t[i][k], t[i][j]);
                    k++;
                    j = k;

                }
                //遇到其他非0数字，k 不能被合并，k++
                else if (t[i][j].val !== 0) {
                    k++;
                    j = k;
                }
            }
        }
        for (let i = 0; i < t.length; i++) {
            k = 0;
            for (let j = k + 1; j < t[i].length && k < t[i].length - 1; j++) {
                //0 不能合并， k 指向的值不能为0
                if (t[i][k].val !== 0) {
                    k++;
                    j = k;
                    continue;
                }
                if (t[i][j].val !== 0) {
                    this.marginTowBox(t[i][k], t[i][j]);
                    k++;
                    j = k;
                }
            }
        }
        return t;
    }

    marginRight = () => {
        let t = this.table;
        let k = this.table.length - 1;
        for (let i = t.length - 1; i >= 0; i--) {
            k = this.table.length - 1;
            for (let j = k - 1; j >= 0 && k >= 1; j--) {
                //0 不能合并， k 指向的值不能为0
                if (t[i][k].val === 0) {
                    k--;
                    j = k;
                    continue;
                }
                //合并两个相同的元素,每个元素只能合并一次，k++
                if (t[i][k].val === t[i][j].val) {
                    this.marginTowBox(t[i][k], t[i][j]);
                    k--;
                    j = k;

                }
                //遇到其他非0数字，k 不能被合并，k++
                else if (t[i][j].val !== 0) {
                    k--;
                    j = k;
                }
            }
        }
        for (let i = t.length - 1; i >= 0; i--) {
            k = this.table.length - 1;;
            for (let j = k - 1; j >= 0 && k >= 1; j--) {
                //0 不能合并， k 指向的值不能为0
                if (t[i][k].val !== 0) {
                    k--;
                    j = k;
                    continue;
                }

                if (t[i][j].val !== 0) {
                    this.marginTowBox(t[i][k], t[i][j]);
                    k--;
                    j = k;
                }
            }
        }
        //console.info(t);
        return t;
    }

}