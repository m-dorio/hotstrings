export default function FormatCurrency(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(amount);
};