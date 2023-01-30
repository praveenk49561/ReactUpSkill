const continent = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Antartica',
    'Australia'
];

const countries = {
    'Africa': ['Nigeria', 'Egypt', 'South Africa'],
    'Asia': ['China', 'Japan', 'India', 'Russia'],
    'Europe': ['Spain', 'Turkey', 'Sweden'],
    'North America': ['Anguillia', 'Aruba', 'Barbados'],
    'South America': ['Argentina', 'Bolivia'],
    'Antartica': [],
    'Australia': []
}
export const getContinents = async () => new Promise((res, rej) => {
    try {
        setTimeout(() => {
            res(continent)
        }, 2000);
    } catch (err) {
        rej({ status: '409', err });
    }
});

export const getCountries = async ({ continent }) => new Promise((res, rej) => {
    try {
        setTimeout(() => {
            res(countries[continent]);
        }, 2000);
    } catch (err) {
        rej({ status: '409', err });
    }
});

export const postData = async (data) => new Promise((res, rej) => {
    try {
        setTimeout(() => {
            res({ status: 200, message: 'Successfully sent.' });
        }, 2000);
    } catch (err) {
        rej({ status: '409', err });
    }
});