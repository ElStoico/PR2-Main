-- Payment Processing Steps table for tracking Chain of Responsibility execution
-- Used to persist the state of payment processing through each step (A, B, C, D)

CREATE TABLE IF NOT EXISTS payment_processing_steps (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL UNIQUE,
    usuario_id VARCHAR(255),
    total_amount DECIMAL(10, 2),
    accumulated_paid DECIMAL(10, 2) DEFAULT 0,
    
    -- Track completion of each step
    step_a_completed BOOLEAN DEFAULT FALSE,
    step_a_timestamp TIMESTAMP,
    step_a_notes VARCHAR(500),
    
    step_b_completed BOOLEAN DEFAULT FALSE,
    step_b_timestamp TIMESTAMP,
    step_b_notes VARCHAR(500),
    
    step_c_completed BOOLEAN DEFAULT FALSE,
    step_c_timestamp TIMESTAMP,
    step_c_notes VARCHAR(500),
    
    step_d_completed BOOLEAN DEFAULT FALSE,
    step_d_timestamp TIMESTAMP,
    step_d_notes VARCHAR(500),
    
    -- Overall status
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT payment_status_check CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'))
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_payment_steps_order_id ON payment_processing_steps(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_steps_status ON payment_processing_steps(status);
CREATE INDEX IF NOT EXISTS idx_payment_steps_usuario_id ON payment_processing_steps(usuario_id);
