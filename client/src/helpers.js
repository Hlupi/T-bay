const comment = comments => {
  if (comments.length > 3) return 5
  else return 0
}

const price = (tickets, ticket) => {
  const eventAllPrices = tickets.map(ticket => ticket.price)
  const numberOfTickets = tickets.length
  const averagePrice = eventAllPrices.reduce((a, b) => a + b, 0) / numberOfTickets
  const ticketPrice = ticket.price
  const risk =  ((averagePrice - ticketPrice) / averagePrice) * 100
  if (risk < -10) return -10
   else return risk
}

const time = ticket => {
  const hours = ticket.postedAt.getHours()
  if (hours > 8 && hours <= 17) return -10
  else return 10
}

const user = (authorTickets) => {
  const tickets = authorTickets.length
  if (tickets === 1) return 10
  else return 0
}

export const Risk = (comments, tickets, ticket, authorTickets) => {
  const minRisk = 5
  const maxRisk = 95
  const risk = comment(comments) + price(tickets, ticket) + time(ticket) + user(authorTickets)
  if (risk < minRisk) return  minRisk.toFixed(0)
  if (risk > maxRisk) return maxRisk.toFixed(0)
  else return risk.toFixed(0)
}