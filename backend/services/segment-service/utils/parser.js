const FIELD_TYPES = {
  id: 'number',
  title: 'string',
  price: 'number',
  stock_status: 'string',
  stock_quantity: 'number',
  category: 'string',
  tags: 'array',
  on_sale: 'boolean',
  created_at: 'string'
};

function castValue(field, value) {
  const type = FIELD_TYPES[field];

  if (type === 'number') {
    const num = Number(value);
    return isNaN(num) ? value : num;
  }

  if (type === 'boolean') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
    return value;
  }

  if (type === 'string') {
    return value.replace(/^["']|["']$/g, '');
  }

  return value; 
}

module.exports = function parseRules(rules) {
  const filters = {};

  rules.forEach(rule => {
    const match = rule.trim().match(/^(\w+)\s*(=|!=|>=|<=|>|<)\s*(.+)$/);
    if (!match) return;

    const [, field, operator, rawValue] = match;

    const value = castValue(field, rawValue);

    switch (operator) {
      case "=":
        filters[field] = value;
        break;
      case "!=":
        filters[field] = { $ne: value };
        break;
      case ">":
        filters[field] = { $gt: value };
        break;
      case ">=":
        filters[field] = { $gte: value };
        break;
      case "<":
        filters[field] = { $lt: value };
        break;
      case "<=":
        filters[field] = { $lte: value };
        break;
    }
  });

  return filters;
};
