export const findAllQuery = (page: number, pageSize: number): string => {
  return `
    SELECT p.property_id AS propertyId, p.title, p.description, p.user AS userId, p.price, p.unit, p.currency,
    p.status, p.certification, p.bedroom, p.bathroom, p.location, p.slug, p.garage, p.carport, p.full_furnished, p.created_at AS createdAt, p.type AS typeId, p.city AS cityId,type.title AS type, city.name AS city, 
    p.square_meter AS area, user.first_name AS firstName, user.phone_number AS phoneNumber, user.picture, 
    GROUP_CONCAT(image.url SEPARATOR ',') AS image
    FROM property p
    INNER JOIN user ON p.user = user.user_id 
    INNER JOIN city ON p.city = city.city_id
    INNER JOIN type ON p.type = type.type_id
    LEFT JOIN image ON p.property_id = image.property
    WHERE p.active = ${1}
    GROUP BY p.property_id
    ORDER BY RAND() LIMIT ${pageSize} OFFSET ${page}
    `;
};

export const findAllByTypeQuery = (
  type: number,
  page: number,
  pageSize: number,
): string => {
  return `
    SELECT p.property_id AS propertyId, p.title, p.description, p.user AS userId, p.price, p.unit, p.currency,
    p.status, p.certification, p.bedroom, p.bathroom, p.location, p.slug, p.garage, p.full_furnished, p.created_at AS createdAt, p.type AS typeId, p.city AS cityId,type.title AS type, city.name AS city, 
    p.square_meter AS area, user.first_name AS firstName, user.phone_number AS phoneNumber, user.picture, 
    GROUP_CONCAT(image.url SEPARATOR ',') AS image
    FROM property p
    INNER JOIN user ON p.user = user.user_id 
    INNER JOIN city ON p.city = city.city_id
    INNER JOIN type ON p.type = type.type_id
    LEFT JOIN image ON p.property_id = image.property
    WHERE p.type = ${type} AND p.active = ${1}
    GROUP BY p.property_id
    ORDER BY RAND() LIMIT ${pageSize} OFFSET ${page}
    `;
};

export const findAllByUserQuery = (
  userId: number,
  page: number,
  pageSize: number,
): string => {
  return `
    SELECT p.property_id AS propertyId, p.title, p.description, p.user AS userId, p.price, p.unit, p.currency,
    p.status, p.certification, p.bedroom, p.bathroom, p.location, p.slug, p.garage, p.full_furnished, p.created_at AS createdAt, p.type AS typeId, p.city AS cityId,type.title AS type, city.name AS city, 
    p.square_meter AS area, user.first_name AS firstName, user.phone_number AS phoneNumber, user.picture, 
    GROUP_CONCAT(image.url SEPARATOR ',') AS image
    FROM property p
    INNER JOIN user ON p.user = user.user_id 
    INNER JOIN city ON p.city = city.city_id
    INNER JOIN type ON p.type = type.type_id
    LEFT JOIN image ON p.property_id = image.property
    WHERE p.user = ${userId} AND p.active = ${1}
    GROUP BY p.property_id
    ORDER BY RAND() LIMIT ${pageSize} OFFSET ${page}
    `;
};

export const findOneQuery = (slug: string): string => {
  return `
    SELECT p.property_id AS propertyId, p.title, p.description, p.user AS userId, p.price, p.unit, p.currency,
    p.status, p.certification, p.type AS type, p.city AS cityId, p.bedroom, p.bathroom, p.square_meter AS area,  p.location, p.slug, p.garage, p.full_furnished, p.created_at AS createdAt, type.title AS type, city.name AS city, 
    user.first_name AS firstName, user.phone_number AS phoneNumber, user.picture, 
    GROUP_CONCAT(image.url SEPARATOR ',') AS image
    FROM property p
    INNER JOIN user ON p.user = user.user_id 
    INNER JOIN city ON p.city = city.city_id
    INNER JOIN type ON p.type = type.type_id
    LEFT JOIN image ON p.property_id = image.property
    WHERE p.slug = "${slug}"
    GROUP BY p.property_id
    `;
};
