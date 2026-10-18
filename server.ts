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
  userId?: string;
}

interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  companyName?: string;
  truckType?: string;
  createdAt: string;
}

const users: UserAccount[] = [];

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

  // Authentication: Register new account
  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { name, email, phone, password, companyName, truckType } = req.body;
    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    } else if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      errors.email = 'An account with this email address already exists.';
    }

    const cleanPhone = phone && typeof phone === 'string' ? phone.replace(/[^0-9+]/g, '') : '';
    if (!cleanPhone || cleanPhone.length < 7) {
      errors.phone = 'Please provide a valid phone number (minimum 7 digits).';
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Registration validation failed. Please check the fields.',
        errors,
      });
    }

    const newUser: UserAccount = {
      id: `usr_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password: password, // In memory demo storage
      companyName: companyName ? String(companyName).trim() : undefined,
      truckType: truckType ? String(truckType).trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    console.log(`[AUTH_REGISTER] Created user account for ${newUser.name} (${newUser.email})`);

    const token = `tok_${newUser.id}_${Date.now()}`;
    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      companyName: newUser.companyName,
      truckType: newUser.truckType,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: safeUser,
      token,
    });
  });

  // Authentication: Sign In
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const foundUser = users.find(
      (u) => u.email.toLowerCase() === String(email).trim().toLowerCase()
    );

    if (!foundUser || foundUser.password !== String(password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify your credentials.',
      });
    }

    const token = `tok_${foundUser.id}_${Date.now()}`;
    const safeUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      companyName: foundUser.companyName,
      truckType: foundUser.truckType,
      createdAt: foundUser.createdAt,
    };

    return res.json({
      success: true,
      message: 'Welcome back!',
      user: safeUser,
      token,
    });
  });

  // Authentication: Get current user profile
  app.get('/api/auth/me', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer tok_')) {
      return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }

    const token = authHeader.replace('Bearer ', '');
    const userIdMatch = token.match(/^tok_(usr_\d+_\d+)_/);
    if (!userIdMatch) {
      return res.status(401).json({ success: false, message: 'Invalid session token.' });
    }

    const userId = userIdMatch[1];
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        companyName: user.companyName,
        truckType: user.truckType,
        createdAt: user.createdAt,
      },
    });
  });

  // Service Request endpoint with rigorous server-side validation
  app.post('/api/service-request', (req: Request, res: Response) => {
    const { name, phone, email, truckType, serviceNeeded, location, problemDescription, urgency, userId } = req.body;

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
      userId: userId ? String(userId) : undefined,
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
  app.get('/api/service-requests', (req: Request, res: Response) => {
    const userId = req.query.userId as string | undefined;
    if (userId) {
      const userTickets = serviceRequests.filter((r) => r.userId === userId);
      return res.json({
        count: userTickets.length,
        requests: userTickets,
      });
    }
    return res.json({
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
