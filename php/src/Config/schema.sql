CREATE TABLE IF NOT EXISTS Categories (name VARCHAR(255) PRIMARY KEY);

CREATE TABLE IF NOT EXISTS Products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    inStock BOOLEAN NOT NULL,
    description TEXT,
    category VARCHAR(255),
    brand VARCHAR(255),
    FOREIGN KEY (category) REFERENCES Categories (name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductGalleries (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(255),
    image_url TEXT,
    FOREIGN KEY (product_id) REFERENCES Products (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductAttributes (
    pk INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS AttributesItems (
    pk INT AUTO_INCREMENT PRIMARY KEY,
    id VARCHAR(50),
    display_value VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    attribute_id INT,
    FOREIGN KEY (attribute_id) REFERENCES ProductAttributes (pk) ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS Currencies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) NOT NULL,
    symbol VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS Prices (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    currency_id INT,
    product_id VARCHAR(255),
    FOREIGN KEY (currency_id) REFERENCES Currencies (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products (id) ON DELETE CASCADE
);