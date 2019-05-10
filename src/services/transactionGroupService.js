import axios from 'axios';

const transactionGroupService = axios.create({
    baseURL:'https://localhost:44343/api/FinancialTransactionGroup/'
});

export default transactionGroupService