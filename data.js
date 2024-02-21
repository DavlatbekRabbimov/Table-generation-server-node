const generateErrors = require("./errors");
const {Faker, en, ru, es, base,} = require("@faker-js/faker");

const fakerInstances = {
    'ru': new Faker({locale: [ru, base]}),
    'en': new Faker({locale: [en, base]}),
    'es': new Faker({locale: [es, base]}),
};

function generateData(region, errors, seed, page, range) {
    try {
        const faker = fakerInstances[region];
        if (!faker) throw new Error(`Unsupported region: ${region}`);
        faker.seed(seed + page);

        const data = [];
        for (let i = 0; i < range; i++) {
            const firstname = faker.person.firstName();
            const lastname = faker.person.lastName();
            const name = faker.person.fullName(firstname, lastname);
            const country = faker.location.country();
            const city = faker.location.city();
            const street = faker.location.street();
            const secondaryAddress = faker.location.secondaryAddress();
            const state = faker.location.state();
            const zipCode = faker.location.zipCode();
            const phone = faker.phone.number();

            const errorCount = Math.floor(errors) + (Math.random() < (errors % 1) ? 1 : 0);

            data.push({
                id: i + 1,
                randomId: faker.string.uuid(),
                name: generateErrors(name, errorCount),
                address: generateErrors(`${city}, ${country}, ${street}, ${secondaryAddress}, ${state}, ${zipCode}`, errorCount),
                phone: generateErrors(phone, errorCount),
            });
        }

        return data;

    } catch (err) {
        console.log(err);
    }
}

module.exports = generateData;
