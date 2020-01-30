class Animation {
    static colors = {
        '-1': "rgb(205, 193, 180)",
        0: "#00000000",
        2: "#fbddb4",
        4: "rgb(255, 191, 106)",
        8: "rgb(236, 135, 0)",
        16: "#ec931c",
        32: "#f58b84",
        64: "#fd4d40",
        128: "#a844b9",
        256: "#673AB7",
        512: "#03A9F4",
        1024: "#ead416",
        2048: "#607D8B",
        // 4096: "#4CAF50",
        // 8192: "#CDDC39",
        // 16384: "#FFEB3B",
        // 32768: "#FF9800",
        // 65536: "#FF5722",
        'other': "#795548",
    };

    constructor(table) {
        this.table = table;
    }

    static getFontColor(val) {
        if (typeof this.colors[val] === 'undefined') {
            return main.getConTrastColor(this.colors['other']).color;
        }
        return main.getConTrastColor(this.colors[val]).color;
    }

    static getColor(val) {
        if (typeof this.colors[val] === 'undefined') {
            return this.colors['other'];
        }
        return this.colors[val];
    }


}