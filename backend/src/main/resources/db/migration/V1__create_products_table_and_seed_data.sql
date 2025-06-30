CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1024),
    price NUMERIC(19, 2) NOT NULL,
    sku VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(255),
    brand VARCHAR(255),
    stock_quantity INTEGER NOT NULL,
    image_url VARCHAR(255),
    weight DOUBLE PRECISION,
    dimensions VARCHAR(255),
    manufacturer VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, sku, category, brand, stock_quantity, image_url, weight, dimensions, manufacturer)
VALUES
('Laptop Pro', 'A powerful laptop for professionals', 1499.99, 'LP-001', 'Electronics', 'TechCorp', 50, 'http://example.com/laptop.jpg', 2.1, '35x25x2 cm', 'TechCorp'),
('Wireless Mouse', 'Ergonomic wireless mouse', 25.50, 'WM-002', 'Accessories', 'TechCorp', 200, 'http://example.com/mouse.jpg', 0.1, '10x6x4 cm', 'TechCorp'),
('Mechanical Keyboard', 'RGB mechanical keyboard for gaming', 120.00, 'MK-003', 'Gaming', 'GameGear', 100, 'http://example.com/keyboard.jpg', 1.2, '45x15x4 cm', 'GameGear'),
('4K Monitor', '27-inch 4K UHD Monitor', 450.00, '4KM-004', 'Electronics', 'ViewSonic', 75, 'http://example.com/monitor.jpg', 5.5, '62x45x20 cm', 'ViewSonic'),
('Webcam HD', '1080p HD Webcam with microphone', 65.00, 'WHD-005', 'Accessories', 'Logi', 150, 'http://example.com/webcam.jpg', 0.2, '8x3x3 cm', 'Logi'),
('Gaming Chair', 'Ergonomic gaming chair with lumbar support', 250.00, 'GC-006', 'Gaming', 'Racer', 40, 'http://example.com/chair.jpg', 20.0, '60x70x120 cm', 'Racer'),
('Smartphone X', 'Latest generation smartphone', 999.99, 'SPX-007', 'Electronics', 'PhoneMakers', 120, 'http://example.com/phone.jpg', 0.18, '15x7x0.8 cm', 'PhoneMakers'),
('Bluetooth Speaker', 'Portable waterproof bluetooth speaker', 80.00, 'BTS-008', 'Audio', 'SoundWave', 300, 'http://example.com/speaker.jpg', 0.5, '18x7x7 cm', 'SoundWave'),
('External SSD 1TB', '1TB External Solid State Drive', 150.00, 'SSD-009', 'Storage', 'DataSafe', 180, 'http://example.com/ssd.jpg', 0.05, '10x5x1 cm', 'DataSafe'),
('Noise Cancelling Headphones', 'Over-ear noise cancelling headphones', 350.00, 'NCH-010', 'Audio', 'SoundWave', 90, 'http://example.com/headphones.jpg', 0.25, '20x18x8 cm', 'SoundWave'),
('Smart Watch', 'Fitness and health tracking smart watch', 199.50, 'SW-011', 'Wearables', 'FitTech', 250, 'http://example.com/watch.jpg', 0.04, '4x4x1 cm', 'FitTech'),
('Graphics Tablet', 'Digital drawing graphics tablet', 95.00, 'GT-012', 'Accessories', 'ArtPad', 60, 'http://example.com/tablet.jpg', 0.6, '30x20x1 cm', 'ArtPad'),
('VR Headset', 'Virtual reality headset for immersive gaming', 499.00, 'VRH-013', 'Gaming', 'VirtuReal', 30, 'http://example.com/vr.jpg', 0.5, '19x10x12 cm', 'VirtuReal'),
('E-Reader', 'Lightweight e-reader with backlight', 130.00, 'ER-014', 'Electronics', 'ReadEasy', 110, 'http://example.com/ereader.jpg', 0.17, '16x11x0.8 cm', 'ReadEasy'),
('USB-C Hub', '7-in-1 USB-C hub with HDMI and SD card reader', 45.00, 'UCH-015', 'Accessories', 'ConnectAll', 400, 'http://example.com/hub.jpg', 0.06, '11x4x1.5 cm', 'ConnectAll');
