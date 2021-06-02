console.log('Topic: Iterators');
// Task 1
// RU: Написать функцию keyValueIterable(target),
//     которая на вход получает объект и возвращает итерируемый объект.
//     Итерируемый объект позволяет получить пары ключ/значение.
//     Выведите в консоль цвета из объекта colors.
// EN: Create a function keyValueIterable(target)
//     which takes an objects and returns iterable object.
//     Iterable object allows you to get key/value pairs.
//     Display in a console all colors from the object colors.
/*const colors = {
    green: '#0e0',
    orange: '#f50',
    pink: '#e07'
};

const keyValueIterable = target => {
    target[Symbol.iterator] = function() {
        return {
            values: Object.entries(target),
            index: 0,
            next() {
                return {
                    done: this.index === this.values.length,
                    value: this.values[this.index++]
                }
            }
        }
    }

    return target;
}

const itColors = keyValueIterable(colors);

for (const [, color] of itColors) {
    console.log(color);
}*/




// Task 2
// RU: В коллекции хранятся все имена пользователей, которые присоединились к определенной группе телеграмм.
//     Булевый флаг указывает, является ли пользователь администратором группы.
//     Создайте итератор, который возвращает только имена администраторов.
// EN: The following collection store all the names of the user that have joined a particular telegram group. 
//     The boolean flag indicates whether a user is an administrator of the group.
//     Сreatereate an iterator that returns only the administrators' names.
/*
const users = {
    anna: false,
    boris: true, // admin
    christina: false,
    dave: false,
    elena: false,
    felix: true,  // admin
};

users[Symbol.iterator] = function() {
    const self = this;

    return {
        values: Object.entries(self).filter(([name, admin]) => admin),
        index: 0,
        next() {
            const done = this.index === this.values.length;

            return {
                done,
                value: done ? null : this.values[this.index++][0]
            };
        }
        
    }
};

console.log(users);

[...users].forEach(name => console.log(name));*/ // boris, felix 


// Task 3
// RU: Написать функцию take(sequence, amount), которая из бесконечного итерируемого объекта random
//     вернет указаное количество элементов.
// EN: Create a function take(sequence, amount), which returns a specified amount of numbers
//     from iterable object random
/*
const random = {
    [Symbol.iterator]: () => ({
        next: () => ({
            value: Math.random()
        })
    })
};

const take = (sequence, amount) => {
    const iterator = sequence[Symbol.iterator]();
    let i = 0;

    return {
        [Symbol.iterator]: () => ({
            next: () => ({
                ...iterator.next(),
                done: i++ === amount
            })
        })
    }
};

const a = [...take(random, 3)];
console.log(a);
*/

// Task 4
// RU: Написать итерируемый итератор, который возвращает числа Фибоначи
//     Реализовать метод return для остановки итератора с помощью for-of + break
// EN: Create iterable iterator, which produces Fibonacci numbers
//     Implement method return, which allows you to stop iterator using for-of + break
/*
const Fib = {
    [Symbol.iterator]: () => {
        let i = 0;
        let value1 = 1;
        let value2 = 1;

        return {
            next() {
                let result;              
                let value;

                if (i <= 1) {
                    result = { value: 1 }
                }
                else {
                    value = value1 + value2;
                    value1 = value2;
                    value2 = value;
                    result = { value };
                }

                i++;

                return result;
            },
            [Symbol.iterator]() { console.log(this); return this },
            return(value) {
                console.log(`stopped on ${value}`);
                return { value, done: true };
            }
        }
    }
}

for (let v of Fib) {
    console.log(v);
    if (v > 50) break;
}

console.log('-----');

for (let v of Fib) {
    console.log(v);
    if (v > 200) break;
}
 */

// Task 5
// RU: Написать итератор для чисел, который позволит получать массивы последовательных целых элементов.
//     Например, [...-3] => [0, -1, -2, -3], [...3] => [0, 1, 2, 3]
// EN: Create iterator for numbers, which allows you to get arrays of sequential integers.
//     Example, [...-3] => [0, -1, -2, -3], [...3] => [0, 1, 2, 3]

Number.prototype[Symbol.iterator] = function() {
    const number = this.valueOf();
    const numberAbs = Math.abs(number);
    const numberSign = Math.sign(number) || 1;
    let current = 0;

    return {
        next() {
            const value = current;
            const done = Math.abs(current) > numberAbs;

            current += numberSign;
            
            return { value, done };
        }
    }   
};

console.log([...-5]);
console.log([...5]);
console.log([...0]);
