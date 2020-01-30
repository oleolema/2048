(function () {

    let create = main.create = {};

    let tableHtml = document.querySelector('.table');
    let head = document.querySelector('head');

    let restartButton = document.querySelector('.restart-button');

    let gameOverHtml = document.querySelector('.game-over');
    let retryButton = document.querySelector('.retry-button');


    let size = create.size = {

    }

    create.isOver = false;


    let calculate = null;

    let tableW = 4;

    let table;




    // table[0][0].val = 2;
    // table[0][1].val = 4;
    // table[0][2].val = 8;
    // table[0][3].val = 16;
    // table[1][0].val = 32;
    // table[1][1].val = 64;
    // table[1][2].val = 128;
    // table[1][3].val = 256;
    // table[2][0].val = 512;
    // table[2][1].val = 1024;
    // table[2][2].val = 2048;


    create.newGame = () => {
        create.isOver = false;
        create.createTable(main.createArray2(tableW, tableW, {
            val: 0,
            ele: {},
        }));
        calculate.createRandomBox();

        // console.info(table, table[0][0].ele);
    }

    create.createTable = (ta) => {
        table = ta;
        let rows = "";
        let spaces = "";
        for (let i = 0; i < ta.length; i++) {
            let columns = "";
            for (let j = 0; j < ta[i].length; j++) {
                columns +=
                    `<div class="col">
                        <div class="box box-outer noTransition pos${i}-${j}" style="background:${Animation.getColor(ta[i][j].val)};color:${Animation.getFontColor(ta[i][j].val)};">${ta[i][j].val === 0 ? "" :ta[i][j].val}</div>
                    </div>`;
                spaces += `<div class="box box-inner pos${i}-${j}" style="background:${Animation.getColor('-1')}"></div>`;
            }
            rows += `<div class="row">${columns}</div>`;
        }
        tableHtml.innerHTML = rows + spaces;
        for (let i = 0; i < ta.length; i++) {
            for (let j = 0; j < ta[i].length; j++) {
                table[i][j].ele = tableHtml.children[i].children[j].children[0];
                table[i][j].pele = table[i][j].ele.parentElement;
                table[i][j].id = i * ta.length + j;
                table[i][j].y = i;
                table[i][j].x = j;
            }
        }
        calculate = new Calculate(table);
        size.boxW = table[0][0].ele.offsetWidth;
        size.boxH = table[0][0].ele.offsetHeight;
        size.colW = table[0][0].ele.parentElement.offsetWidth;
        size.colH = table[0][0].ele.parentElement.offsetHeight;
        console.info(size);
    };

    create.createStyle = () => {
        ta = table;
        let style = "";
        for (let i = 0; i < ta.length; i++) {
            for (let j = 0; j < ta[i].length; j++) {
                style += `.pos${i}-${j}{
                        transform: translate3d(${j * size.colW}px,${i * size.colH}px,0);
                        transform-origin: ${j * size.colW + size.boxW/2}px ${i * size.colH + size.boxH/2}px 0
                    }

                    `;
            }
        }
        head.innerHTML += `<style>${style}</style>`;
    }

    create.reloadTable = (ta) => {
        for (let i = 0; i < ta.length; i++) {
            for (let j = 0; j < ta[i].length; j++) {
                // console.info(table[i][j].val);
                table[i][j].ele.innerHTML = table[i][j].val === 0 ? "" : table[i][j].val;
                table[i][j].ele.style.backgroundColor = Animation.getColor(table[i][j].val);
                table[i][j].ele.style.color = Animation.getFontColor(table[i][j].val);
            }
        }
    }

    create.reload = (list) => {
        console.info(list);
        for (let i = 0; i < list.length; i++) {
            console.info(list[i]);
            let {
                y,
                x
            } = list[i];
            list[i].pele.innerHTML = `
            <div class="box box-outer transition pos${y}-${x}" style="background:${Animation.getColor(list[i].val)};color:${Animation.getFontColor(list[i].val)}">${list[i].val === 0 ? "" :list[i].val}</div>`
            list[i].ele = list[i].pele.children[0];
            list[i].ele.style.transform = `scale(0.1)  translate3d(${x * size.colW}px,${y * size.colH}px,0)`
            setTimeout(() => {
                list[i].ele.style.transform = ``
                setTimeout(() => {
                    main.replaceClass(list[i].ele, 'transition', 'noTransition');
                }, 300);
            }, 20);
            table[y][x] = list[i];
        }
    }

    create.newGame();
    create.createStyle();

    restartButton.onclick = (e) => {
        console.info(e);
        create.newGame();
        // main.replaceClass(gameOverHtml, 'game-over-hidden', 'game-over-show');
    };

    retryButton.onclick = (e) => {
        main.replaceClass(gameOverHtml, 'game-over-show', 'game-over-hidden');
    }

    let operator = (type) => {
        if (create.isOver) {
            return;
        }
        let t = null;
        switch (type) {
            case 'left':
                t = calculate.marginLeft();
                break;
            case 'right':
                t = calculate.marginRight();
                break;
            case 'up':
                t = calculate.marginUp();
                break;
            case 'down':
                t = calculate.marginDown();
                break;
        }
        if (t) {
            create.reloadTable(t);
            //生成新元素
            setTimeout(() => {
                calculate.createRandomBox();
            }, 200);
            create.isOver = !calculate.checkCanMove();
            if (create.isOver) {
                main.replaceClass(gameOverHtml, 'game-over-hidden', 'game-over-show');
            }
        }
    }

    window.onkeydown = (e) => {
        console.info(e.key);

        switch (e.key.toLowerCase()) {
            case "d":
            case "arrowright":
                operator('right');
                break;
            case "a":
            case "arrowleft":
                operator('left');
                break;
            case "w":
            case "arrowup":
                operator('up');
                break;
            case "s":
            case "arrowdown":
                operator('down');
                break;
        }



    };

    let manager = new Hammer.Manager(document.body);

    let Swipe = new Hammer.Swipe();
    Swipe.set({
        direction: Hammer.DIRECTION_ALL,
    })

    manager.add(Swipe);

    manager.on('swipe', function (e) {
        console.info(e.offsetDirection);
        switch (e.offsetDirection) {
            //left
            case 2:
                operator('left');
                break;
                //right
            case 4:
                operator('right')
                break;
                //up
            case 8:
                operator('up')
                break;
                //down
            case 16:
                operator('down');
                break;
        }
    });







})();