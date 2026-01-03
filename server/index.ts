import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/companies', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies WHERE is_active = true ORDER BY company_name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/companies', async (req, res) => {
  try {
    const { company_name, name, tax_number, tax_office, address, phone, email } = req.body;
    const companyName = company_name || name;
    if (!companyName) {
      return res.status(400).json({ error: 'Company name is required' });
    }
    const result = await pool.query(
      'INSERT INTO companies (company_name, tax_number, tax_office, address, phone, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [companyName, tax_number || null, tax_office || null, address || null, phone || null, email || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/employees', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees WHERE is_active = true ORDER BY full_name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const { full_name, name, registration_number, phone, email, expertise } = req.body;
    const employeeName = full_name || name;
    if (!employeeName) {
      return res.status(400).json({ error: 'Employee name is required' });
    }
    const result = await pool.query(
      'INSERT INTO employees (full_name, registration_number, phone, email, expertise) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [employeeName, registration_number || null, phone || null, email || null, expertise || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ships', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ships WHERE is_active = true ORDER BY ship_name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching ships:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/ships', async (req, res) => {
  try {
    const { ship_name, name, imo_number, flag, ship_type, deadweight } = req.body;
    const shipName = ship_name || name;
    if (!shipName) {
      return res.status(400).json({ error: 'Ship name is required' });
    }
    const result = await pool.query(
      'INSERT INTO ships (ship_name, imo_number, flag, ship_type, deadweight) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [shipName, imo_number || null, flag || null, ship_type || null, deadweight || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating ship:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/inspection-areas', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inspection_areas WHERE is_active = true ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching inspection areas:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/inspection-areas', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO inspection_areas (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating inspection area:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/inspection-items', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inspection_items WHERE is_active = true ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching inspection items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/inspection-items', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO inspection_items (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating inspection item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/inspection-types', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inspection_types WHERE is_active = true ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching inspection types:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/inspection-types', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO inspection_types (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating inspection type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/locations', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations WHERE is_active = true ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/locations', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO locations (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/topics', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM topics WHERE is_active = true ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/topics', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO topics (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating topic:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/provinces', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM provinces ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching provinces:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/districts/:provinceId', async (req, res) => {
  try {
    const { provinceId } = req.params;
    const result = await pool.query('SELECT * FROM districts WHERE province_id = $1 ORDER BY name', [provinceId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/work-orders', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT wo.*, 
        c.company_name, 
        s.ship_name,
        ia.name as inspection_area_name,
        ii.name as inspection_item_name,
        l.name as supervision_location_name,
        t.name as topic_name,
        p.name as province_name,
        d.name as district_name
      FROM work_orders wo
      LEFT JOIN companies c ON wo.company_id = c.id
      LEFT JOIN ships s ON wo.ship_id = s.id
      LEFT JOIN inspection_areas ia ON wo.inspection_area_id = ia.id
      LEFT JOIN inspection_items ii ON wo.inspection_item_id = ii.id
      LEFT JOIN locations l ON wo.supervision_location_id = l.id
      LEFT JOIN topics t ON wo.topic_id = t.id
      LEFT JOIN provinces p ON wo.province_id = p.id
      LEFT JOIN districts d ON wo.district_id = d.id
      ORDER BY wo.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching work orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/work-orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT wo.*, 
        c.company_name, 
        s.ship_name,
        ia.name as inspection_area_name,
        ii.name as inspection_item_name,
        l.name as supervision_location_name,
        t.name as topic_name,
        p.name as province_name,
        d.name as district_name
      FROM work_orders wo
      LEFT JOIN companies c ON wo.company_id = c.id
      LEFT JOIN ships s ON wo.ship_id = s.id
      LEFT JOIN inspection_areas ia ON wo.inspection_area_id = ia.id
      LEFT JOIN inspection_items ii ON wo.inspection_item_id = ii.id
      LEFT JOIN locations l ON wo.supervision_location_id = l.id
      LEFT JOIN topics t ON wo.topic_id = t.id
      LEFT JOIN provinces p ON wo.province_id = p.id
      LEFT JOIN districts d ON wo.district_id = d.id
      WHERE wo.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    const workOrder = result.rows[0];

    const typesResult = await pool.query(
      `SELECT it.id, it.name FROM work_order_inspection_types woit 
       JOIN inspection_types it ON woit.inspection_type_id = it.id 
       WHERE woit.work_order_id = $1`, [id]
    );
    const personnelResult = await pool.query(
      `SELECT e.id, e.full_name FROM work_order_personnel wop 
       JOIN employees e ON wop.employee_id = e.id 
       WHERE wop.work_order_id = $1`, [id]
    );
    const tasksResult = await pool.query(
      `SELECT task_name FROM work_order_tasks WHERE work_order_id = $1`, [id]
    );

    workOrder.inspection_types = typesResult.rows;
    workOrder.personnel = personnelResult.rows;
    workOrder.tasks = tasksResult.rows.map(r => r.task_name);

    res.json(workOrder);
  } catch (error) {
    console.error('Error fetching work order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/work-orders/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { id } = req.params;
    const {
      status,
      report_date,
      inspection_date,
      date_range_end,
      invoice_number,
      tonnage,
      topic_id,
      company_id,
      customer_ref_no,
      ship_id,
      inspection_area_id,
      inspection_item_id,
      supervision_location_id,
      province_id,
      district_id,
      other_tasks_description,
      inspection_type_ids,
      personnel_ids,
      selected_tasks
    } = req.body;

    await client.query(
      `UPDATE work_orders SET
        status = $1, report_date = $2, inspection_date = $3, date_range_end = $4,
        invoice_number = $5, tonnage = $6, topic_id = $7, company_id = $8,
        customer_ref_no = $9, ship_id = $10, inspection_area_id = $11, 
        inspection_item_id = $12, supervision_location_id = $13, province_id = $14,
        district_id = $15, other_tasks_description = $16, updated_at = NOW()
      WHERE id = $17`,
      [status, report_date || null, inspection_date || null, date_range_end || null,
       invoice_number, tonnage || null, topic_id || null, company_id || null,
       customer_ref_no, ship_id || null, inspection_area_id || null,
       inspection_item_id || null, supervision_location_id || null, province_id || null,
       district_id || null, other_tasks_description, id]
    );

    await client.query('DELETE FROM work_order_inspection_types WHERE work_order_id = $1', [id]);
    await client.query('DELETE FROM work_order_personnel WHERE work_order_id = $1', [id]);
    await client.query('DELETE FROM work_order_tasks WHERE work_order_id = $1', [id]);

    if (inspection_type_ids && inspection_type_ids.length > 0) {
      for (const typeId of inspection_type_ids) {
        await client.query(
          'INSERT INTO work_order_inspection_types (work_order_id, inspection_type_id) VALUES ($1, $2)',
          [id, typeId]
        );
      }
    }

    if (personnel_ids && personnel_ids.length > 0) {
      for (const personnelId of personnel_ids) {
        await client.query(
          'INSERT INTO work_order_personnel (work_order_id, employee_id) VALUES ($1, $2)',
          [id, personnelId]
        );
      }
    }

    if (selected_tasks && selected_tasks.length > 0) {
      for (const taskName of selected_tasks) {
        await client.query(
          'INSERT INTO work_order_tasks (work_order_id, task_name) VALUES ($1, $2)',
          [id, taskName]
        );
      }
    }

    await client.query('COMMIT');
    res.json({ success: true });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating work order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

app.get('/api/work-orders/next-number/:fileType', async (req, res) => {
  try {
    const { fileType } = req.params;
    const result = await pool.query(
      'SELECT COALESCE(MAX(file_number), 0) + 1 as next_number FROM work_orders WHERE file_type = $1',
      [fileType]
    );
    res.json({ nextNumber: result.rows[0].next_number });
  } catch (error) {
    console.error('Error getting next number:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/work-orders', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const {
      file_type,
      file_number,
      status,
      report_date,
      inspection_date,
      date_range_end,
      invoice_number,
      responsible,
      tonnage,
      topic_id,
      company_id,
      customer_ref_no,
      ship_id,
      inspection_area_id,
      inspection_item_id,
      supervision_location_id,
      province_id,
      district_id,
      other_tasks_description,
      inspection_type_ids,
      personnel_ids,
      selected_tasks
    } = req.body;

    const workOrderResult = await client.query(
      `INSERT INTO work_orders (
        file_type, file_number, status, report_date, inspection_date, date_range_end,
        invoice_number, responsible, tonnage, topic_id, company_id, customer_ref_no,
        ship_id, inspection_area_id, inspection_item_id, supervision_location_id,
        province_id, district_id, other_tasks_description
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING *`,
      [
        file_type, file_number, status || 'Açık', report_date || null, inspection_date || null,
        date_range_end || null, invoice_number, responsible, tonnage || null, topic_id || null,
        company_id || null, customer_ref_no, ship_id || null, inspection_area_id || null,
        inspection_item_id || null, supervision_location_id || null, province_id || null,
        district_id || null, other_tasks_description
      ]
    );

    const workOrderId = workOrderResult.rows[0].id;

    if (inspection_type_ids && inspection_type_ids.length > 0) {
      for (const typeId of inspection_type_ids) {
        await client.query(
          'INSERT INTO work_order_inspection_types (work_order_id, inspection_type_id) VALUES ($1, $2)',
          [workOrderId, typeId]
        );
      }
    }

    if (personnel_ids && personnel_ids.length > 0) {
      for (const personnelId of personnel_ids) {
        await client.query(
          'INSERT INTO work_order_personnel (work_order_id, employee_id) VALUES ($1, $2)',
          [workOrderId, personnelId]
        );
      }
    }

    if (selected_tasks && selected_tasks.length > 0) {
      for (const taskName of selected_tasks) {
        await client.query(
          'INSERT INTO work_order_tasks (work_order_id, task_name) VALUES ($1, $2)',
          [workOrderId, taskName]
        );
      }
    }

    await client.query('COMMIT');
    res.status(201).json(workOrderResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating work order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
