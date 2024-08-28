-- Active: 1724817730954@@3.79.108.220@3306@ecommerce
-- Insert Categories
INSERT INTO Categories (name) VALUES ('all'), ('clothes'), ('tech');

-- Insert Products
INSERT INTO
    Products (
        id,
        name,
        inStock,
        description,
        category,
        brand
    )
VALUES (
        'huarache-x-stussy-le',
        'Nike Air Huarache Le',
        TRUE,
        '<p>Great sneakers for everyday use!</p>',
        'clothes',
        'Nike x Stussy'
    ),
    (
        'jacket-canada-goosee',
        'Jacket',
        TRUE,
        '<p>Awesome winter jacket</p>',
        'clothes',
        'Canada Goose'
    ),
    (
        'ps-5',
        'PlayStation 5',
        TRUE,
        '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>',
        'tech',
        'Sony'
    ),
    (
        'xbox-series-s',
        'Xbox Series S 512GB',
        FALSE,
        '<div><ul><li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li><li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li><li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li><li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li><li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li><li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li><li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li><li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li><li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li><li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li></ul></div>',
        'tech',
        'Microsoft'
    ),
    (
        'apple-imac-2021',
        'iMac 2021',
        TRUE,
        'The new iMac!',
        'tech',
        'Apple'
    ),
    (
        'apple-iphone-12-pro',
        'iPhone 12 Pro',
        TRUE,
        'This is iPhone 12. Nothing else to say.',
        'tech',
        'Apple'
    ),
    (
        'apple-airpods-pro',
        'AirPods Pro',
        FALSE,
        '<h3>Magic like you’ve never heard</h3><p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.<h3>Active Noise Cancellation</h3><p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.<h3>Transparency mode</h3><p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p><h3>All-new design</h3><p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p><h3>Amazing audio quality</h3><p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p><h3>Even more magical</h3><p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>',
        'tech',
        'Apple'
    ),
    (
        'apple-airtag',
        'AirTag',
        TRUE,
        '<h1>Lose your knack for losing things.</h1><p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>',
        'tech',
        'Apple'
    );

-- Insert ProductGalleries
INSERT INTO
    ProductGalleries (product_id, image_url)
VALUES (
        'huarache-x-stussy-le',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'
    ),
    (
        'huarache-x-stussy-le',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087'
    ),
    (
        'huarache-x-stussy-le',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087'
    ),
    (
        'huarache-x-stussy-le',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087'
    ),
    (
        'huarache-x-stussy-le',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'
    ),
    (
        'jacket-canada-goosee',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg'
    ),
    (
        'jacket-canada-goosee',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg'
    ),
    (
        'jacket-canada-goosee',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg'
    ),
    (
        'jacket-canada-goosee',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg'
    ),
    (
        'jacket-canada-goosee',
        'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg'
    ),
    (
        'jacket-canada-goosee',
        'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png'
    ),
    (
        'jacket-canada-goosee',
        'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png'
    ),
    (
        'ps-5',
        'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg'
    ),
    (
        'ps-5',
        'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg'
    ),
    (
        'ps-5',
        'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg'
    ),
    (
        'ps-5',
        'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg'
    ),
    (
        'ps-5',
        'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg'
    ),
    (
        'xbox-series-s',
        'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg'
    ),
    (
        'xbox-series-s',
        'https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg'
    ),
    (
        'xbox-series-s',
        'https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg'
    ),
    (
        'xbox-series-s',
        'https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg'
    ),
    (
        'xbox-series-s',
        'https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg'
    ),
    (
        'apple-imac-2021',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000'
    ),
    (
        'apple-iphone-12-pro',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1604021663000'
    ),
    (
        'apple-airpods-pro',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000'
    ),
    (
        'apple-airtag',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000'
    );

-- Insert ProductAttributes and AttributesItems
INSERT INTO
    ProductAttributes (product_id, id, name, type)
VALUES (
        'huarache-x-stussy-le',
        'Size',
        'Size',
        'text'
    ),
    (
        'jacket-canada-goosee',
        'Size',
        'Size',
        'text'
    ),
    (
        'ps-5',
        'Color',
        'Color',
        'swatch'
    ),
    (
        'ps-5',
        'Capacity',
        'Capacity',
        'text'
    ),
    (
        'xbox-series-s',
        'Color',
        'Color',
        'swatch'
    ),
    (
        'xbox-series-s',
        'Capacity',
        'Capacity',
        'text'
    ),
    (
        'apple-imac-2021',
        'Capacity',
        'Capacity',
        'text'
    ),
    (
        'apple-imac-2021',
        'With USB 3 ports',
        'With USB 3 ports',
        'text'
    ),
    (
        'apple-imac-2021',
        'Touch ID in keyboard',
        'Touch ID in keyboard',
        'text'
    ),
    (
        'apple-iphone-12-pro',
        'Capacity',
        'Capacity',
        'text'
    ),
    (
        'apple-iphone-12-pro',
        'Color',
        'Color',
        'swatch'
    );

-- Insert AttributesItems
INSERT INTO
    AttributesItems (
        id,
        display_value,
        value,
        attribute_id
    )
VALUES (
        '40',
        '40',
        '40',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'huarache-x-stussy-le'
                AND id = 'Size'
        )
    ),
    (
        '41',
        '41',
        '41',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'huarache-x-stussy-le'
                AND id = 'Size'
        )
    ),
    (
        '42',
        '42',
        '42',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'huarache-x-stussy-le'
                AND id = 'Size'
        )
    ),
    (
        '43',
        '43',
        '43',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'huarache-x-stussy-le'
                AND id = 'Size'
        )
    ),
    (
        'Small',
        'Small',
        'S',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'jacket-canada-goosee'
                AND id = 'Size'
        )
    ),
    (
        'Medium',
        'Medium',
        'M',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'jacket-canada-goosee'
                AND id = 'Size'
        )
    ),
    (
        'Large',
        'Large',
        'L',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'jacket-canada-goosee'
                AND id = 'Size'
        )
    ),
    (
        'Extra Large',
        'Extra Large',
        'XL',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'jacket-canada-goosee'
                AND id = 'Size'
        )
    ),
    (
        'Green',
        'Green',
        '#44FF03',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'ps-5'
                AND id = 'Color'
        )
    ),
    (
        'Cyan',
        'Cyan',
        '#03FFF7',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'ps-5'
                AND id = 'Color'
        )
    ),
    (
        'Blue',
        'Blue',
        '#030BFF',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'ps-5'
                AND id = 'Color'
        )
    ),
    (
        'Black',
        'Black',
        '#000000',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'ps-5'
                AND id = 'Color'
        )
    ),
    (
        'White',
        'White',
        '#FFFFFF',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'ps-5'
                AND id = 'Color'
        )
    ),
    (
        '512G',
        '512G',
        '512G',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'ps-5'
                AND id = 'Capacity'
        )
    ),
    (
        '1T',
        '1T',
        '1T',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'ps-5'
                AND id = 'Capacity'
        )
    ),
    (
        'Green',
        'Green',
        '#44FF03',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'xbox-series-s'
                AND id = 'Color'
        )
    ),
    (
        'Cyan',
        'Cyan',
        '#03FFF7',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'xbox-series-s'
                AND id = 'Color'
        )
    ),
    (
        'Blue',
        'Blue',
        '#030BFF',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'xbox-series-s'
                AND id = 'Color'
        )
    ),
    (
        'Black',
        'Black',
        '#000000',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'xbox-series-s'
                AND id = 'Color'
        )
    ),
    (
        'White',
        'White',
        '#FFFFFF',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'xbox-series-s'
                AND id = 'Color'
        )
    ),
    (
        '512G',
        '512G',
        '512G',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'xbox-series-s'
                AND id = 'Capacity'
        )
    ),
    (
        '1T',
        '1T',
        '1T',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'xbox-series-s'
                AND id = 'Capacity'
        )
    ),
    (
        '256GB',
        '256GB',
        '256GB',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-imac-2021'
                AND id = 'Capacity'
        )
    ),
    (
        '512GB',
        '512GB',
        '512GB',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-imac-2021'
                AND id = 'Capacity'
        )
    ),
    (
        'Yes',
        'Yes',
        'Yes',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-imac-2021'
                AND id = 'With USB 3 ports'
        )
    ),
    (
        'No',
        'No',
        'No',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-imac-2021'
                AND id = 'With USB 3 ports'
        )
    ),
    (
        'Yes',
        'Yes',
        'Yes',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-imac-2021'
                AND id = 'Touch ID in keyboard'
        )
    ),
    (
        'No',
        'No',
        'No',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-imac-2021'
                AND id = 'Touch ID in keyboard'
        )
    ),
    (
        '512G',
        '512G',
        '512G',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-iphone-12-pro'
                AND id = 'Capacity'
        )
    ),
    (
        '1T',
        '1T',
        '1T',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-iphone-12-pro'
                AND id = 'Capacity'
        )
    ),
    (
        'Green',
        'Green',
        '#44FF03',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-iphone-12-pro'
                AND id = 'Color'
        )
    ),
    (
        'Cyan',
        'Cyan',
        '#03FFF7',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-iphone-12-pro'
                AND id = 'Color'
        )
    ),
    (
        'Blue',
        'Blue',
        '#030BFF',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-iphone-12-pro'
                AND id = 'Color'
        )
    ),
    (
        'Black',
        'Black',
        '#000000',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-iphone-12-pro'
                AND id = 'Color'
        )
    ),
    (
        'White',
        'White',
        '#FFFFFF',
        (
            SELECT pk
            FROM ProductAttributes
            WHERE
                product_id = 'apple-iphone-12-pro'
                AND id = 'Color'
        )
    );

-- Insert Currencies
INSERT INTO Currencies (label, symbol) VALUES ('USD', '$');

-- Insert Prices
INSERT INTO
    Prices (
        amount,
        currency_id,
        product_id
    )
VALUES (
        144.69,
        (
            SELECT id
            FROM Currencies
            WHERE
                label = 'USD'
        ),
        'huarache-x-stussy-le'
    ),
    (
        518.47,
        (
            SELECT id
            FROM Currencies
            WHERE
                label = 'USD'
        ),
        'jacket-canada-goosee'
    ),
    (
        844.02,
        (
            SELECT id
            FROM Currencies
            WHERE
                label = 'USD'
        ),
        'ps-5'
    ),
    (
        333.99,
        (
            SELECT id
            FROM Currencies
            WHERE
                label = 'USD'
        ),
        'xbox-series-s'
    ),
    (
        1688.03,
        (
            SELECT id
            FROM Currencies
            WHERE
                label = 'USD'
        ),
        'apple-imac-2021'
    ),
    (
        1000.76,
        (
            SELECT id
            FROM Currencies
            WHERE
                label = 'USD'
        ),
        'apple-iphone-12-pro'
    ),
    (
        300.23,
        (
            SELECT id
            FROM Currencies
            WHERE
                label = 'USD'
        ),
        'apple-airpods-pro'
    ),
    (
        120.57,
        (
            SELECT id
            FROM Currencies
            WHERE
                label = 'USD'
        ),
        'apple-airtag'
    );