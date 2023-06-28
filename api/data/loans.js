const loans = [
  {
    idNumber: "123456789",
    loanDate: new Date("2023-06-20"),
    repaymentDate: new Date("2023-07-05"),
    loanAmount: 1500,
    repaymentAmount: 1650,
    settled: false,
    notes: "Urgent loan"
  },
  {
    idNumber: "321654987",
    loanDate: new Date("2023-06-10"),
    repaymentDate: new Date("2023-06-30"),
    loanAmount: 1000,
    repaymentAmount: 1200,
    settled: true,
    notes: "Settled on time"
  },
  {
    idNumber: "123456789",
    loanDate: new Date("2023-06-15"),
    repaymentDate: new Date("2023-06-30"),
    loanAmount: 2000,
    repaymentAmount: 2300,
    settled: false,
    notes: ''
  },
  {
    idNumber: "654321987",
    loanDate: new Date("2023-06-25"),
    repaymentDate: new Date("2023-07-10"),
    loanAmount: 3000,
    repaymentAmount: 3300,
    settled: false,
    notes: ''
  },
  {
    idNumber: "987654321",
    loanDate: new Date("2023-06-12"),
    repaymentDate: new Date("2023-06-28"),
    loanAmount: 2500,
    repaymentAmount: 2750,
    settled: true,
    notes: ''
  },
  {
    idNumber: "123456789",
    loanDate: new Date("2023-06-18"),
    repaymentDate: new Date("2023-07-05"),
    loanAmount: 1800,
    repaymentAmount: 2000,
    settled: true,
    notes: ''
  },
  {
    idNumber: "654321987",
    loanDate: new Date("2023-06-23"),
    repaymentDate: new Date("2023-07-08"),
    loanAmount: 1200,
    repaymentAmount: 1320,
    settled: false,
    notes: "Additional interest charges"
  },
  {
    idNumber: "987654321",
    loanDate: new Date("2023-06-08"),
    repaymentDate: new Date("2023-06-25"),
    loanAmount: 500,
    repaymentAmount: 550,
    settled: true,
    notes: ''
  },
  {
    idNumber: "456789123",
    loanDate: new Date("2023-06-14"),
    repaymentDate: new Date("2023-06-30"),
    loanAmount: 800,
    repaymentAmount: 920,
    settled: false,
    notes: "Requires follow-up"
  },
  {
    idNumber: "987654321",
    loanDate: new Date("2023-06-21"),
    repaymentDate: new Date("2023-07-07"),
    loanAmount: 3000,
    repaymentAmount: 3300,
    settled: false,
    notes: ''
  }
];

module.exports = loans;
