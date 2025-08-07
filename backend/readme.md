# 🧠 Carbon Calculator GraphQL Backend

This is the GraphQL API backend for **Carbon Calculator**, a carbon footprint calculator. It provides emission data and calculates greenhouse gas emissions based on user input.

---

## 🚀 Features

- GraphQL API built with TypeScript
- Emission sectors and consumption types
- Dynamic carbon emission calculations
- Designed to be used with the CO2Track frontend

---

## 🛠 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm run dev
```

> You may use `ts-node-dev` or `nodemon` with TypeScript as your dev server. Example:
>
> ```json
> "dev": "ts-node-dev src/server.ts"
> ```

---

## 🔬 Running Tests

### Run all unit tests with:

```bash
npm test
```

> Make sure you've configured `jest.config.js` using `ts-jest`.

---

## 📂 Example GraphQL Query

```graphql
query {
  emissionSectors {
    id
    consumptions {
      id
      usageMeasureUnit
      emissionFactor
    }
  }
}
```

```graphql
query Calculate($calculationsInput: [CalculationInput!]!) {
  calculations(calculationsInput: $calculationsInput) {
    rawValue
    formattedValue
  }
}
```
