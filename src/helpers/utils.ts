export function formatDate(date: string) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hour = d.getHours();
  const minute = d.getMinutes();
  return `${day}/${month}/${year} ${hour}:${
    minute < 10 ? "0" + minute : minute
  }`;
}

export function sortByDate(array: any[], order: string) {
  return order == "asc"
    ? array?.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      })
    : array?.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
}

export function formatAmount(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}
