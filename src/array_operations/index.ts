/**
 * Исходные данные
 **/

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  age: number;
}

const users: User[] = [
  {
    id: 7,
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg',
    age: 23
  },
  {
    id: 8,
    email: 'lindsay.ferguson@reqres.in',
    first_name: 'Lindsay',
    last_name: 'Ferguson',
    avatar: 'https://reqres.in/img/faces/8-image.jpg',
    age: 20
  },
  {
    id: 9,
    email: 'tobias.funke@reqres.in',
    first_name: 'Tobias',
    last_name: 'Funke',
    avatar: 'https://reqres.in/img/faces/9-image.jpg',
    age: 40
  },
  {
    id: 10,
    email: 'byron.fields@reqres.in',
    first_name: 'Byron',
    last_name: 'Fields',
    avatar: 'https://reqres.in/img/faces/10-image.jpg',
    age: 36
  },
  {
    id: 11,
    email: 'george.edwards@reqres.in',
    first_name: 'George',
    last_name: 'Edwards',
    avatar: 'https://reqres.in/img/faces/11-image.jpg',
    age: 70
  },
  {
    id: 12,
    email: 'rachel.howell@reqres.in',
    first_name: 'Rachel',
    last_name: 'Howell',
    avatar: 'https://reqres.in/img/faces/12-image.jpg',
    age: 45
  }
];

/**
 * 1. Получить строку с именами и фамилиями всех
 * пользователей через запятую.
 **/

function getUsersFullName(user: User) {
  return `${user.first_name} ${user.last_name}`;
}

const fullnames = users.map(getUsersFullName).join(', ');
console.debug(fullnames);

/**
 * 2. Создать массив из emails по алфавиту
 **/

type UsersEmails = string[];

function getUsersEmail(user: User) {
  return user.email;
}

const emails: UsersEmails = users.map(getUsersEmail);
console.debug(emails);

const sortedEmails: UsersEmails = emails.sort();
console.debug(sortedEmails);

/**
 * 3.Создать новый массив пользователей,где объект пользователя должен
 * содержать только id и поле, отвечающее за имя пользователя
 * (например, username), которое должно содержать имя и фамилию.
 **/

type UsersBio = Pick<User, 'id'> & { fullname: string };

function getShortDetails(user: User): UsersBio {
  return {
    id: user.id,
    fullname: getUsersFullName(user)
  };
}

const shortDetails = users.map(getShortDetails);
console.debug(shortDetails);

/**
 * 4. Создать массив пользователей, где они отсортированы
 * по возрасту по возрастанию и все пользователи младше 40 лет.
 **/

function getUsersAge(user: User) {
  return user.age;
}

function getYoungUsers(users: User[]) {
  return users.filter((user) => getUsersAge(user) < 40);
}

const youngUsers = getYoungUsers(users);
const sortedYoungUsers = youngUsers.sort((a, b) => (a.age > b.age ? 1 : -1));

console.debug(sortedYoungUsers);

/**
 * Получить объект, где были бы
 * a) данные о среднем возрасте пользователей
 * b) количество пользователей старше 30
 * c) количество пользователей старше 40
 * d) количество пользователей старше 18
 **/

interface Statisctics {
  gt30: number;
  gt40: number;
  gt18: number;
  avgAge: number;
}

function getStatisctics(users: User[]): Statisctics {
  return users.reduce(
    (accumulator: Statisctics, user: User, index: number) => {
      if (user.age > 40) {
        accumulator.gt40 += 1;
      }
      if (user.age > 30) {
        accumulator.gt30 += 1;
      }
      if (user.age > 18) {
        accumulator.gt18 += 1;
      }

      // Формула: https://habr.com/ru/company/ruvds/blog/458030/
      accumulator.avgAge =
        (user.age + accumulator.avgAge * index) / (index + 1);
      return accumulator;
    },
    {
      gt30: 0,
      gt40: 0,
      gt18: 0,
      avgAge: 0
    }
  );
}

const stats = getStatisctics(users);
console.debug(stats);

/**
 * 6. Создать объект,где ключ,это первая буква фамилии,а значение -
 * массив из фамилий пользователей начинающихся на эту букву. Объект
 * должен состоять только из ключей существующих фамилий в этом массиве.
 **/

type AlphabetStats = {
  [firstLetter: string]: string[];
};

function getAlphabetStats(users: User[]): AlphabetStats {
  return users.reduce((accumulator: AlphabetStats, user: User) => {
    const [firstLetter] = user.last_name.slice(0, 1);
    if (!accumulator[firstLetter]) {
      accumulator[firstLetter] = [];
    }
    accumulator[firstLetter].push(user.last_name);
    return accumulator;
  }, {});
}

const alphabetStats = getAlphabetStats(users);
console.debug(alphabetStats);

/**
 * Пример каррирования
 **/
const getUsersFilter = (age: number) => (user: User) => user.age > age;

const isPensioner = getUsersFilter(63);
const isAdult = getUsersFilter(21);

const pensioneers = users.filter(isPensioner);
const adults = users.filter(isAdult);

console.debug(pensioneers);
console.debug(adults);
