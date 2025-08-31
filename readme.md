-- Master table: Items
CREATE TABLE Items (
    ItemID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Model VARCHAR(100),
    TotalQty INT NOT NULL,
    ShelfNumber VARCHAR(50),
    UnitPriceBirr INT NOT NULL,
    UnitPriceCent INT NOT NULL,
    -- Store total price (in Birr and Cent) to make reporting easier
    TotalPriceBirr INT GENERATED ALWAYS AS (TotalQty * UnitPriceBirr) STORED,
    TotalPriceCent INT GENERATED ALWAYS AS (TotalQty * UnitPriceCent) STORED,
    Remark VARCHAR(255)
);

-- Table for individual units of each item
CREATE TABLE ItemUnits (
    UnitID INT PRIMARY KEY AUTO_INCREMENT,
    ItemID INT NOT NULL,
    SerialNo VARCHAR(100) NOT NULL UNIQUE,
    Barcode VARCHAR(255) NOT NULL UNIQUE, -- Store generated barcode string or image reference
    Status VARCHAR(50) DEFAULT 'AVAILABLE', -- AVAILABLE / ISSUED / RETURNED / DAMAGED
    AssignedTo VARCHAR(100),
    UnitPriceBirr INT,
    UnitPriceCent INT,
    -- Optional: Total price per unit (usually same as unit price)
    TotalPrice DECIMAL(10,2) GENERATED ALWAYS AS (
        UnitPriceBirr + (UnitPriceCent / 100.0)
    ) STORED,
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);



-- Table for Item Names (master list of unique names)
CREATE TABLE ItemNames (
    NameID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL UNIQUE
);

-- Master table: Items (linked with ItemNames)
CREATE TABLE Items (
    ItemID INT PRIMARY KEY AUTO_INCREMENT,
    NameID INT NOT NULL,                      -- foreign key to ItemNames
    Model VARCHAR(100) NOT NULL,
    TotalQty INT NOT NULL,
    ShelfNumber VARCHAR(50),
    UnitPriceBirr INT NOT NULL,
    UnitPriceCent INT NOT NULL,
    -- Store total price (in Birr and Cent) to make reporting easier
    TotalPriceBirr INT GENERATED ALWAYS AS (TotalQty * UnitPriceBirr) STORED,
    TotalPriceCent INT GENERATED ALWAYS AS (TotalQty * UnitPriceCent) STORED,
    Remark VARCHAR(255),
    FOREIGN KEY (NameID) REFERENCES ItemNames(NameID),
    CONSTRAINT uq_item UNIQUE (NameID, Model) -- prevent duplicate Name + Model
);

-- Table for individual units of each item
CREATE TABLE ItemUnits (
    UnitID INT PRIMARY KEY AUTO_INCREMENT,
    ItemID INT NOT NULL,
    SerialNo VARCHAR(100) NOT NULL UNIQUE,
    Barcode VARCHAR(255) NOT NULL UNIQUE, -- Store generated barcode string or image reference
    Status VARCHAR(50) DEFAULT 'AVAILABLE', -- AVAILABLE / ISSUED / RETURNED / DAMAGED
    AssignedTo VARCHAR(100),
    UnitPriceBirr INT,
    UnitPriceCent INT,
    -- Optional: Total price per unit (usually same as unit price)
    TotalPrice DECIMAL(10,2) GENERATED ALWAYS AS (
        UnitPriceBirr + (UnitPriceCent / 100.0)
    ) STORED,
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);




//
ot it 👍. You already have the table schema for Items and ItemUnits.
Now I’ll give you example SQL inserts to show how data will look inside these tables with Birr/Cent, Serial Numbers, and Barcodes.

✅ Example Data for Items
INSERT INTO Items (Name, Model, TotalQty, ShelfNumber, UnitPriceBirr, UnitPriceCent, Remark)
VALUES 
('Laptop', 'Dell Inspiron 3511', 3, 'A12', 25000, 50, 'For office use'),
('Projector', 'Epson X200', 2, 'B07', 15000, 0, 'Meeting room projector'),
('Printer', 'HP LaserJet P1102', 5, 'C03', 8000, 75, 'For admin office');


👉 After insert, MySQL will auto-generate TotalPriceBirr and TotalPriceCent like this:

ItemID	Name	Model	TotalQty	ShelfNumber	UnitPriceBirr	UnitPriceCent	TotalPriceBirr	TotalPriceCent	Remark
1	Laptop	Dell Inspiron 3511	3	A12	25000	50	75000	150	For office use
2	Projector	Epson X200	2	B07	15000	0	30000	0	Meeting room projector
3	Printer	HP LaserJet P1102	5	C03	8000	75	40000	375	For admin office
✅ Example Data for ItemUnits
INSERT INTO ItemUnits (ItemID, SerialNo, Barcode, Status, AssignedTo, UnitPriceBirr, UnitPriceCent)
VALUES
-- Laptops
(1, 'SN-LAP-001', 'BCODE-LAP-001', 'AVAILABLE', NULL, 25000, 50),
(1, 'SN-LAP-002', 'BCODE-LAP-002', 'ISSUED', 'Staff001', 25000, 50),
(1, 'SN-LAP-003', 'BCODE-LAP-003', 'AVAILABLE', NULL, 25000, 50),

-- Projectors
(2, 'SN-PRO-001', 'BCODE-PRO-001', 'AVAILABLE', NULL, 15000, 0),
(2, 'SN-PRO-002', 'BCODE-PRO-002', 'ISSUED', 'Manager001', 15000, 0),

-- Printers
(3, 'SN-PRN-001', 'BCODE-PRN-001', 'AVAILABLE', NULL, 8000, 75),
(3, 'SN-PRN-002', 'BCODE-PRN-002', 'AVAILABLE', NULL, 8000, 75),
(3, 'SN-PRN-003', 'BCODE-PRN-003', 'AVAILABLE', NULL, 8000, 75),
(3, 'SN-PRN-004', 'BCODE-PRN-004', 'ISSUED', 'Staff002', 8000, 75),
(3, 'SN-PRN-005', 'BCODE-PRN-005', 'DAMAGED', NULL, 8000, 75);


👉 Example output in ItemUnits table:

UnitID	ItemID	SerialNo	Barcode	Status	AssignedTo	UnitPriceBirr	UnitPriceCent	TotalPrice
1	1	SN-LAP-001	BCODE-LAP-001	AVAILABLE	NULL	25000	50	25000.50
2	1	SN-LAP-002	BCODE-LAP-002	ISSUED	Staff001	25000	50	25000.50
3	1	SN-LAP-003	BCODE-LAP-003	AVAILABLE	NULL	25000	50	25000.50
4	2	SN-PRO-001	BCODE-PRO-001	AVAILABLE	NULL	15000	0	15000.00
5	2	SN-PRO-002	BCODE-PRO-002	ISSUED	Manager001	15000	0	15000.00
6	3	SN-PRN-001	BCODE-PRN-001	AVAILABLE	NULL	8000	75	8000.75
7	3	SN-PRN-002	BCODE-PRN-002	AVAILABLE	NULL	8000	75	8000.75
8	3	SN-PRN-003	BCODE-PRN-003	AVAILABLE	NULL	8000	75	8000.75
9	3	SN-PRN-004	BCODE-PRN-004	ISSUED	Staff002	8000	75	8000.75
10	3	SN-PRN-005	BCODE-PRN-005	DAMAGED	NULL	8000	75	8000.75




-- =======================================
-- Request Form (Model 20)
-- =======================================

CREATE TABLE RequestForm (
    request_id      INT PRIMARY KEY AUTO_INCREMENT,
    staff_id        INT NOT NULL,              -- FK to users table
    item_name       VARCHAR(150) NOT NULL,     -- Item being requested
    quantity        INT NOT NULL,              -- Number requested
    measurement     VARCHAR(50),               -- e.g., pcs, box, kg
    status          ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    manager_comment VARCHAR(255),              -- Manager can write note
    request_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_request_staff FOREIGN KEY (staff_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE
);




-- ================================
-- Model 22 (Clerk Issue/Return Record) - Without ClerkID
-- ================================
CREATE TABLE Model22Form (
    FormID INT PRIMARY KEY AUTO_INCREMENT,
    RequestID INT NOT NULL,           -- FK to Model 20 (RequestForm)
    StaffID INT NOT NULL,             -- Staff who requested the item
    ItemID INT NOT NULL,              -- Linked to Items table
    UnitID INT NOT NULL,              -- Specific unit (serial number from ItemUnits)
    
    ActionType ENUM('ISSUE','RETURN') NOT NULL, -- Whether clerk issued or recorded return
    ActionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    Quantity INT NOT NULL,            -- Issued or Returned quantity
    UnitPriceBirr INT NOT NULL,
    UnitPriceCent INT NOT NULL,
    TotalPriceBirr INT GENERATED ALWAYS AS (Quantity * UnitPriceBirr) STORED,
    TotalPriceCent INT GENERATED ALWAYS AS (Quantity * UnitPriceCent) STORED,
    
    BalanceQty INT,                   -- Remaining balance after issue/return
    Remark VARCHAR(255),
    
    FOREIGN KEY (RequestID) REFERENCES Requests(RequestID),
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID),
    FOREIGN KEY (UnitID) REFERENCES ItemUnits(UnitID)
);



// i used mode 22


CREATE TABLE Model22Form (
    FormID INT PRIMARY KEY AUTO_INCREMENT,
    RequestID INT NOT NULL,         -- matches RequestForm.request_id
    StaffID INT NOT NULL,           -- matches Users.user_id
    ItemID INT NOT NULL,            -- matches Items.ItemID
    UnitID INT NOT NULL,            -- matches ItemUnits.UnitID

    ActionType ENUM('ISSUE','RETURN') NOT NULL,
    ActionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    Quantity INT NOT NULL,            
    UnitPriceBirr INT NOT NULL,
    UnitPriceCent INT NOT NULL,
    TotalPriceBirr INT GENERATED ALWAYS AS (Quantity * UnitPriceBirr) STORED,
    TotalPriceCent INT GENERATED ALWAYS AS (Quantity * UnitPriceCent) STORED,
    
    BalanceQty INT,                   
    Remark VARCHAR(255),

    -- Correct foreign keys
    FOREIGN KEY (RequestID) REFERENCES RequestForm(request_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (StaffID) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (UnitID) REFERENCES ItemUnits(UnitID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;









-- ================================
-- Model 22 (Clerk Issue/Return Record) - Without ClerkID
-- ================================
CREATE TABLE Model22Form (
    FormID INT PRIMARY KEY AUTO_INCREMENT,
    RequestID INT NOT NULL,           -- FK to Model 20 (RequestForm)
    StaffID INT NOT NULL,             -- Staff who requested the item
    ItemID INT NOT NULL,              -- Linked to Items table
    UnitID INT NOT NULL,              -- Specific unit (serial number from ItemUnits)
    
    ActionType ENUM('ISSUE','RETURN') NOT NULL, -- Whether clerk issued or recorded return
    ActionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    Quantity INT NOT NULL,            -- Issued or Returned quantity
    UnitPriceBirr INT NOT NULL,
    UnitPriceCent INT NOT NULL,
    TotalPriceBirr INT GENERATED ALWAYS AS (Quantity * UnitPriceBirr) STORED,
    TotalPriceCent INT GENERATED ALWAYS AS (Quantity * UnitPriceCent) STORED,
    
    BalanceQty INT,                   -- Remaining balance after issue/return
    Remark VARCHAR(255),
    
    FOREIGN KEY (RequestID) REFERENCES Requests(RequestID),
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID),
    FOREIGN KEY (UnitID) REFERENCES ItemUnits(UnitID)
);









-- ==========================================================
-- 1. Master Tables (Item Names, Items, Item Units)
-- ==========================================================

-- Item Names (unique item names)
CREATE TABLE ItemNames (
    NameID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL UNIQUE
);

-- Items (each model under an ItemName)
CREATE TABLE Items (
    ItemID INT PRIMARY KEY AUTO_INCREMENT,
    NameID INT NOT NULL,                   
    Model VARCHAR(100) NOT NULL,
    TotalQty INT NOT NULL,
    ShelfNumber VARCHAR(50),
    UnitPriceBirr INT NOT NULL,
    UnitPriceCent INT NOT NULL,
    TotalPriceBirr INT GENERATED ALWAYS AS (TotalQty * UnitPriceBirr) STORED,
    TotalPriceCent INT GENERATED ALWAYS AS (TotalQty * UnitPriceCent) STORED,
    Remark VARCHAR(255),
    FOREIGN KEY (NameID) REFERENCES ItemNames(NameID),
    CONSTRAINT uq_item UNIQUE (NameID, Model)
);

-- Item Units (each physical unit with Serial Number & Barcode)
CREATE TABLE ItemUnits (
    UnitID INT PRIMARY KEY AUTO_INCREMENT,
    ItemID INT NOT NULL,
    SerialNo VARCHAR(100) NOT NULL UNIQUE,
    Barcode VARCHAR(255) NOT NULL UNIQUE,
    Status ENUM('AVAILABLE','ISSUED','RETURNED','DAMAGED') DEFAULT 'AVAILABLE',
    AssignedTo INT, -- StaffID when issued
    UnitPriceBirr INT,
    UnitPriceCent INT,
    TotalPrice DECIMAL(10,2) GENERATED ALWAYS AS (
        UnitPriceBirr + (UnitPriceCent / 100.0)
    ) STORED,
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);

-- ==========================================================
-- 2. Staff & Requests
-- ==========================================================

-- Staff (covers Admin, Manager, Clerk, Regular Staff by Role)
CREATE TABLE Staff (
    StaffID INT PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(150) NOT NULL,
    Role ENUM('ADMIN','MANAGER','CLERK','STAFF','ICT') NOT NULL
);

-- Model 20: Request Form (staff requests items)
CREATE TABLE Requests (
    RequestID INT PRIMARY KEY AUTO_INCREMENT,
    StaffID INT NOT NULL,
    ItemID INT NOT NULL,
    Quantity INT NOT NULL,
    RequestDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ManagerStatus ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);

-- ==========================================================
-- 3. Model 22: Clerk Issue/Return Records
-- ==========================================================
CREATE TABLE Model22Form (
    FormID INT PRIMARY KEY AUTO_INCREMENT,
    RequestID INT NOT NULL,           
    StaffID INT NOT NULL,             
    ItemID INT NOT NULL,              
    UnitID INT NOT NULL,              
    
    ActionType ENUM('ISSUE','RETURN') NOT NULL,
    ActionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    Quantity INT NOT NULL,
    UnitPriceBirr INT NOT NULL,
    UnitPriceCent INT NOT NULL,
    TotalPriceBirr INT GENERATED ALWAYS AS (Quantity * UnitPriceBirr) STORED,
    TotalPriceCent INT GENERATED ALWAYS AS (Quantity * UnitPriceCent) STORED,
    
    BalanceQty INT,                   
    Remark VARCHAR(255),
    
    FOREIGN KEY (RequestID) REFERENCES Requests(RequestID),
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID),
    FOREIGN KEY (UnitID) REFERENCES ItemUnits(UnitID)
);

-- ==========================================================
-- 4. Return Request Workflow (Staff → ICT → Manager → Clerk)
-- ==========================================================
CREATE TABLE ReturnRequestForm (
    ReturnRequestID INT PRIMARY KEY AUTO_INCREMENT,
    FormID INT NOT NULL,               -- Link to issued record in Model22Form
    StaffID INT NOT NULL,              
    ItemID INT NOT NULL,
    UnitID INT NOT NULL,
    RequestDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    ICTStatus ENUM('PENDING','ACCEPTED','REJECTED') DEFAULT 'PENDING',
    ICTRemark VARCHAR(255),

    ManagerStatus ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    ManagerRemark VARCHAR(255),

    FinalStatus ENUM('PENDING','APPROVED','REJECTED') 
        GENERATED ALWAYS AS (
            CASE 
                WHEN ICTStatus = 'REJECTED' THEN 'REJECTED'
                WHEN ICTStatus = 'ACCEPTED' AND ManagerStatus = 'APPROVED' THEN 'APPROVED'
                ELSE 'PENDING'
            END
        ) STORED,

    FOREIGN KEY (FormID) REFERENCES Model22Form(FormID),
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID),
    FOREIGN KEY (UnitID) REFERENCES ItemUnits(UnitID)
);

-- ==========================================================
-- 5. Example Triggers (Auto-update stock)
-- ==========================================================

-- When an item is ISSUED
CREATE TRIGGER trg_issue_item
AFTER INSERT ON Model22Form
FOR EACH ROW
BEGIN
    IF NEW.ActionType = 'ISSUE' THEN
        UPDATE Items 
        SET TotalQty = TotalQty - NEW.Quantity
        WHERE ItemID = NEW.ItemID;

        UPDATE ItemUnits
        SET Status = 'ISSUED', AssignedTo = NEW.StaffID
        WHERE UnitID = NEW.UnitID;
    END IF;
END;

-- When an item is RETURNED
CREATE TRIGGER trg_return_item
AFTER INSERT ON Model22Form
FOR EACH ROW
BEGIN
    IF NEW.ActionType = 'RETURN' THEN
        UPDATE Items 
        SET TotalQty = TotalQty + NEW.Quantity
        WHERE ItemID = NEW.ItemID;

        UPDATE ItemUnits
        SET Status = 'RETURNED', AssignedTo = NULL
        WHERE UnitID = NEW.UnitID;
    END IF;
END;






==============================

-- Model 22 (Clerk Issue/Return Record)
-- Links RequestForm, Users, Items, ItemUnits
-- ================================
CREATE TABLE `model22form` (
    FormID INT NOT NULL AUTO_INCREMENT,
    RequestID INT NOT NULL,          -- FK to requestform.request_id
    StaffID VARCHAR(10) NOT NULL,    -- FK to users.staff_id
    ItemID INT NOT NULL,             -- FK to items.ItemID
    UnitID INT NOT NULL,             -- FK to itemunits.UnitID

    ActionType ENUM('ISSUE','RETURN') NOT NULL,
    ActionDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    Quantity INT NOT NULL,
    UnitPriceBirr INT NOT NULL,
    UnitPriceCent INT NOT NULL,
    TotalPriceBirr INT GENERATED ALWAYS AS (Quantity * UnitPriceBirr) STORED,
    TotalPriceCent INT GENERATED ALWAYS AS (Quantity * UnitPriceCent) STORED,

    BalanceQty INT,
    Remark VARCHAR(255),

    PRIMARY KEY (FormID),
    
    -- Foreign keys
    CONSTRAINT fk_m22_request FOREIGN KEY (RequestID) 
        REFERENCES requestform(request_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_m22_staff FOREIGN KEY (StaffID) 
        REFERENCES users(staff_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_m22_item FOREIGN KEY (ItemID) 
        REFERENCES items(ItemID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_m22_unit FOREIGN KEY (UnitID) 
        REFERENCES itemunits(UnitID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;






✅ Recommended Design Update
model22form (Header)
CREATE TABLE model22form (
    FormID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    RequestID INT NOT NULL,      -- FK to requestform
    StaffID VARCHAR(10) NOT NULL,-- FK to users
    ClerkID INT NOT NULL,        -- FK to clerks table (if exists)
    ActionType ENUM('ISSUE','RETURN') NOT NULL,
    ActionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Remark VARCHAR(255),

    CONSTRAINT fk_m22_request FOREIGN KEY (RequestID) 
        REFERENCES requestform(request_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_m22_staff FOREIGN KEY (StaffID) 
        REFERENCES users(staff_id) ON DELETE CASCADE ON UPDATE CASCADE
);

model22formdetails (Issued/Returned Units)
CREATE TABLE model22formdetails (
    DetailID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FormID INT NOT NULL,              -- FK to model22form
    ItemID INT NOT NULL,              -- FK to items
    UnitID INT NOT NULL,              -- FK to itemunits (serial no)
    Quantity INT NOT NULL DEFAULT 1,  -- always 1 per serial unit
    UnitPrice DECIMAL(10,2) NOT NULL, -- e.g. 999.75 (Birr + Cent together)
    TotalPrice DECIMAL(10,2) GENERATED ALWAYS AS (Quantity * UnitPrice) STORED,

    FOREIGN KEY (FormID) REFERENCES model22form(FormID) ON DELETE CASCADE,
    FOREIGN KEY (ItemID) REFERENCES items(ItemID) ON DELETE CASCADE,
    FOREIGN KEY (UnitID) REFERENCES itemunits(UnitID) ON DELETE CASCADE
);




//coorect
DROP TABLE IF EXISTS `Model22Form`;

CREATE TABLE `Model22Form` (
    `FormID` INT NOT NULL AUTO_INCREMENT,
    `RequestID` INT NOT NULL,
    `StaffID` VARCHAR(10) NOT NULL,       -- string staff_id
    `FName` VARCHAR(50) NOT NULL,
    `LName` VARCHAR(50) NOT NULL,
    `ItemID` INT NOT NULL,
    `UnitID` INT NOT NULL,
    `ActionType` ENUM('ISSUE','RETURN') NOT NULL,
    `ActionDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Quantity` INT NOT NULL,
    `UnitPriceBirr` INT NOT NULL,
    `UnitPriceCent` INT NOT NULL,
    `TotalPriceBirr` INT GENERATED ALWAYS AS (`Quantity` * `UnitPriceBirr`) STORED,
    `TotalPriceCent` INT GENERATED ALWAYS AS (`Quantity` * `UnitPriceCent`) STORED,
    `BalanceQty` INT DEFAULT NULL,
    `Remark` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`FormID`),
    KEY `idx_request` (`RequestID`),
    KEY `idx_staff` (`StaffID`),
    KEY `idx_item` (`ItemID`),
    KEY `idx_unit` (`UnitID`),
    CONSTRAINT `fk_model22_request` FOREIGN KEY (`RequestID`) REFERENCES `requestform` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_model22_staff` FOREIGN KEY (`StaffID`) REFERENCES `users` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_model22_item` FOREIGN KEY (`ItemID`) REFERENCES `items` (`ItemID`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_model22_unit` FOREIGN KEY (`UnitID`) REFERENCES `itemunits` (`UnitID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
