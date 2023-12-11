
export class Procentajes {

    constructor() { }

    desimalPor(key: any) {
        return this.desimal(key) + '%';
    }

    desimal(key: any) {
        let e = key;
        if (e !== undefined) {
            let rst = '';
            if (e != '100') {
                e = e.split('');
                let count = 0;

                for (let i = e.length - 1; i >= 0; i--) {

                    count = count + 1;
                    rst = e[i] + rst;

                    if (count === 2) {
                        if (e[i - 1] !== undefined) {
                            rst = '.' + rst;
                        }
                        count = 0;
                    }
                }
            } else {
                rst = e;
            }
            return rst;
        }
    }

    desimalDeMiles(key: any) {
        let e = key;
        console.log(key)
        return new Intl.NumberFormat("de-DE").format(Math.round(e));
        // if (e !== undefined) {
        //     e = e.split("");
        //     let count = 0, rst = '';
        //     for (let i = e.length - 1; i >= 0; i--) {
        //         count = count + 1;
        //         rst = e[i] + rst;
        //         if (count === 3) {
        //             if (e[i - 1] !== undefined) {
        //                 rst = '.' + rst;
        //             }
        //             count = 0;
        //         }
        //     }
            
        //     return rst;
        // }
    }

    removerDesimal(e: any) {
        if (e !== '') {
            if (typeof e === 'string') {
                const a = e.split('.');
                let res = '';
                for (let i = 0; i < a.length; i++) {
                    res = res + a[i];
                }
                return res === '' ? e : res;
            }
        } else {
            return '';
        }
    }

    removerPor(data: any) {
        if (data !== undefined) {
            const e = data.split('%');
            return e[0];
        }
    }

    verificarDatos(data, array, key) {
        let a = false, b = false;

        if (array.length === 0) {
            return true;
        }

        for (let i = 0; i <= array.length - 1; i++) {
            const o = array[i];
            if (o !== undefined) {
                console.log(data[key[0]] === o[key[0]] && data[key[1]] === o[key[1]]);
                if (data[key[0]] === o[key[0]] && data[key[1]] === o[key[1]]) {
                    a = true;
                } else {
                    b = false;
                }
            } else {
                return true;
            }
        }

        return a === b;

    }

    claveValor(key, data, valor) {

        for (let i = 0; i <= data.length - 1; i++) {
            const e = data[i];
            if (e[key] == valor) {
                return e;
            }
        }
    }

    /**
     * adicion de metodos
     */



}