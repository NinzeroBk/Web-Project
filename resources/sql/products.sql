CREATE TYPE product_category AS ENUM('for enthusiasts', 'for creators', 'for gamers', 'for work', 'for everyone');
CREATE TYPE product_subcategory AS ENUM('phone', 'laptop', 'component');


CREATE TABLE IF NOT EXISTS products (
   id serial PRIMARY KEY,
   name VARCHAR(50) UNIQUE NOT NULL,
   description TEXT,
   image VARCHAR(300),
   purpose product_category DEFAULT 'for everyone',
   type product_subcategory DEFAULT 'phone',
   price NUMERIC(8,2) NOT NULL,   
   warranty INT NOT NULL CHECK (warranty>0),
   date_added TIMESTAMP DEFAULT current_timestamp,
   color VARCHAR(50) NOT NULL,
   specs VARCHAR [] NOT NULL, --pot sa nu fie specificare deci nu punem NOT NULL
   child_proof BOOLEAN NOT NULL DEFAULT TRUE,
);

INSERT into products (name, description, image, purpose, type, price, warranty, color, specs, child_proof) VALUES 
('Samsung Galaxy S21', 'Flagship phone from Samsung', 'GalaxyS21.png', 'for enthusiasts', 'phone', 3000, 24, 'grey', '{"120Hz Screen","Exynos 2100", "8GB Ram", "128GB Storage"}', True),
('Samsung Galaxy A52s', 'Budget phone from Samsung', 'GalaxyA52s.png', 'for everyone', 'phone', 2000, 24, 'blue', '{"120Hz Screen","Snapdragon 778G", "6GB Ram", "128GB Storage"}', True),
('Sony Xperia Pro-I', 'A phone for creators from Sony', 'XperiaProI.png', 'for creators', 'phone', 7000, 24, 'black', '{"120Hz Screen","Snapdragon 888", "12GB Ram", "512GB Storage"}', True),
('Samsung Galaxy Z Fold 3', 'Foldable phone from Samsung', 'GalaxyZFold3.png', 'for work', 'phone', 5000, 24, 'white', '{"120Hz Screen","Snapdragon 888", "12GB Ram", "256GB Storage"}', True),
('Asus ROG Phone 5s Pro', 'Gaming phone from Asus', 'ROGPhone5sPro.png', 'for gamers', 'phone', 4000, 24, 'black', '{"144Hz Screen","Snapdragon 888+", "18GB Ram", "512GB Storage"}', True),
('Dell Alienware M15 R4', 'Laptop for enthusiasts from Dell', 'AlienwareM15R4.png', 'for enthusiasts', 'laptop', 34000, 24, 'white', '{"15.6 inch Screen", " Intel i9-10980HK", "32GB Ram", "4TB Storage"}', False),
('Asus ROG Zephyrus Duo 15 SE', 'Laptop for creators from Asus', 'ZephyrusDuo15.png', 'for creators', 'laptop', 15000, 24, 'black', '{"15.6 inch Screen", "AMD Ryzen 7 5800H", "16GB Ram", "1TB Storage"}', False),
('Lenovo Legion 5', 'Gaming laptop from Lenovo', 'Legion5.png', 'for gamers', 'laptop', 5000, 24, 'black', '{"15.6 inch Screen", "Intel i7-10750H", "16GB Ram", "512GB Storage"}', False),
('Lenovo IdeaPad 5', 'Office Laptop from Lenovo', 'IdeaPad5.png', 'for work', 'laptop', 3000, 24, 'grey', '{"14 inch Screen", "AMD Ryzen 5 4500U", "8GB Ram", "256GB Storage"}', True),
('Apple Macbook Air', 'Everyday laptop from Apple', 'MacbookAir.png', 'for everyone', 'laptop', 5000, 24, 'grey', '{"13 inch Screen", "Apple M1", "8GB Ram", "256GB Storage"}', True),
('Gigabyte Geforce RTX 3060 Ti', 'High-end graphics card from Nvidia', 'RTX3060Ti.png', 'for gamers', 'component', 5500, 24, 'black', '{"1740 Mhz", "8GB GDDR6", "256 bit BUS", "PCI Express 4.0"}', False),
('AMD Threadripper 3990X', 'High-end enthusiast CPU from AMD', 'AMDThreadripper.png', 'for enthusiasts', 'component', 23000, 24, 'grey', '{"4.3 Ghz", "64 Cores", "128 Threads", "280W"}', False),
('Samsung 870 EVO', 'Budget SSD for everyday use', 'Samsung870EVO.png', 'for everyone', 'component', 300, 24, 'black', '{"2.5 inch size", "Samsung MKX Controller", "Sata-III", "500GB Storage"}', False),
('Corsair Vencgeance LPX', 'RAM Kit from Corsair', 'Corsair64GB.png', 'for creators', 'component', 1300, 24, 'black', '{"64 GB","3200 Mhz", "CL 16", "1.35 V"}', False),
('Segotep SG-M350', 'Small power supply from Segotep', 'Segotep350.png', 'for work', 'component', 130, 24, 'grey', '{"350 W", "1x80 mm", "SFX", "No cables included"}', False);