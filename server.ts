import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ServiceRequestPayload {
  name: string;
  phone: string;
  email: string;
  truckType: string;
  serviceNeeded: string;
  location: string;
  problemDescription: string;
  urgency?: string;
}

const serviceRequests: Array<
  ServiceRequestPayload & {
    id: string;
    ticketNumber: string;
    createdAt: string;
    status: 'RECEIVED' | 'DISPATCH_REVIEW' | 'CONTACTED';
  }
> = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Real backend API endpoints
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'operational',
      service: 'TRUCK SERVICE SI Backend',
      timestamp: new Date().toISOString(),
    });
  });

  // Service Request endpoint with rigorous server-side validation
  app.post('/api/service-request', (req: Request, res: Response) => {
    const { name, phone, email, truckType, serviceNeeded, location, problemDescription, urgency } = req.body;

    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please provide your full contact name or fleet title.';
    }

    const cleanPhone = phone && typeof phone === 'string' ? phone.replace(/[^0-9+]/g, '') : '';
    if (!cleanPhone || cleanPhone.length < 7) {
      errors.phone = 'Please provide a valid phone number for dispatch callback.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid business email address.';
    }

    if (!truckType || typeof truckType !== 'string' || truckType.trim().length < 2) {
      errors.truckType = 'Please select or specify your truck or equipment type.';
    }

    if (!serviceNeeded || typeof serviceNeeded !== 'string' || serviceNeeded.trim().length < 2) {
      errors.serviceNeeded = 'Please select the service required.';
    }

    if (!location || typeof location !== 'string' || location.trim().length < 2) {
      errors.location = 'Please state your vehicle location, yard address, or highway mile marker.';
    }

    if (!problemDescription || typeof problemDescription !== 'string' || problemDescription.trim().length < 10) {
      errors.problemDescription = 'Please describe the problem or symptoms (minimum 10 characters).';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please resolve the highlighted fields before submitting.',
        errors,
      });
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const ticketNumber = `TSI-${randomSuffix}`;
    const newRecord = {
      id: `req_${Date.now()}_${randomSuffix}`,
      ticketNumber,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      truckType: truckType.trim(),
      serviceNeeded: serviceNeeded.trim(),
      location: location.trim(),
      problemDescription: problemDescription.trim(),
      urgency: urgency || 'Standard Business Dispatch',
      createdAt: new Date().toISOString(),
      status: 'RECEIVED' as const,
    };

    serviceRequests.unshift(newRecord);
    console.log(`[SERVICE_REQUEST] New Ticket ${ticketNumber} registered for ${name} (${truckType})`);

    return res.status(201).json({
      success: true,
      ticketNumber: newRecord.ticketNumber,
      receivedAt: newRecord.createdAt,
      status: newRecord.status,
      message: `Your service ticket ${ticketNumber} has been logged in our dispatch queue. Our service advisor will call ${phone} directly.`,
      record: newRecord,
    });
  });

  // Query recent service requests
  app.get('/api/service-requests', (_req: Request, res: Response) => {
    res.json({
      count: serviceRequests.length,
      requests: serviceRequests.slice(0, 20),
    });
  });

  // Check specific ticket status
  app.get('/api/service-request/:ticketNumber', (req: Request, res: Response) => {
    const ticketNumber = req.params.ticketNumber.toUpperCase();
    const found = serviceRequests.find((r) => r.ticketNumber === ticketNumber);
    if (!found) {
      return res.status(404).json({ success: false, message: 'Ticket not found in queue.' });
    }
    return res.json({ success: true, request: found });
  });

  // Dev server with Vite middlewares / Production static assets
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TRUCK SERVICE SI server ready at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
