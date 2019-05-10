import axios from 'axios';

const transactionsService = axios.create({
    baseURL:'https://localhost:44343/api/FinancialTransaction/'
});
export default transactionsService;