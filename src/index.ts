import day1 from './day_1/index';
import day2 from './day_2/index';


const init = () => {
    process.argv.forEach( (val, index) => {
        if(index === 2){
            switch (val) {
                case '1':
                    day1();
                    break;
                case '2':
                    day2();
                    break;
                default:
                    console.log('unexpected argument')
            }
        }
    });
}

init();