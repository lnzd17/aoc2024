import day1 from './day_1/index';
import day2 from './day_2/index';
import day3 from './day_3/index';


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
                case '3': 
                    day3();
                    break;
                default:
                    console.log('unexpected argument')
            }
        }
    });
}

init();