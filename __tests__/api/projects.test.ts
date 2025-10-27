// mock the DB connector module (default export)
jest.mock('@/app/lib/dbService/db', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue(undefined)
}));

// mock the Project model module; expose create so tests can control it
jest.mock('@/app/models/Project', () => ({
    __esModule: true,
    default: {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn()
    }
}));

import {
    DELETE,
    GET as PROJECT_GET_BY_ID,
    PUT
} from '@/app/api/projects/[id]/route';
// import the route and types after env + mocks are set
import { POST } from '@/app/api/projects/route';
import { GET as PROJECT_USER_GET } from '@/app/api/projects/user/[user]/route';
import { STATUS_DETAILS } from '@/app/types/status';

// arrange - make the model return a "saved" document
const dbProjectA = {
    _id: 'abc123',
    name: 'New Project A',
    description: 'Project Description B',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: STATUS_DETAILS.not_started,
    managedBy: '64f72bf0f1c1b47650cbe8a1',
    teamMembers: ['test1@gmail.com', 'test2@gmail.com']
};

// arrange - make the model return a "saved" document
const dbProjectB = {
    _id: 'def456',
    name: 'New Project B',
    description: 'Project Description B',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: STATUS_DETAILS.not_started,
    managedBy: '64f72bf0f1c1b47650cbe8a1',
    teamMembers: ['test3@gmail.com', 'test4@gmail.com']
};

const ProjectModel = jest.requireMock('@/app/models/Project').default as {
    find: jest.Mock;
    findById: jest.Mock;
    create: jest.Mock;
    findByIdAndUpdate: jest.Mock;
    findByIdAndDelete: jest.Mock;
};

describe('Projects API - Fetch projects by userId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch projects by userId and return success', async () => {
        (ProjectModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([
                {
                    ...dbProjectA
                },
                { ...dbProjectB }
            ])
        });

        const req = new Request(
            `http://localhost/api/projects/user/${dbProjectA.managedBy}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // act
        const res = await PROJECT_USER_GET(req, {
            params: { user: dbProjectA.managedBy }
        });
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data.length).toBe(2);
        expect(ProjectModel.find).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB create throws', async () => {
        // arrange - simulate DB error
        (ProjectModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const req = new Request(
            `http://localhost/api/projects/user/${dbProjectA.managedBy}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // act
        const res = await PROJECT_USER_GET(req, {
            params: { user: dbProjectA.managedBy }
        });
        const body = await res.json();
        expect(res.status).toBe(500);
        expect(body.status).toBe('error');
        expect(ProjectModel.find).toHaveBeenCalledTimes(1);
    });
});

describe('Tasks API - Fetch project by Id', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch project by ID and return success', async () => {
        (ProjectModel.findById as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                ...dbProjectA
            })
        });

        const req = new Request(
            `http://localhost/api/projects/${dbProjectA._id}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // act
        const res = await PROJECT_GET_BY_ID(req, {
            params: { id: dbProjectA._id }
        });
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data._id).toBe(dbProjectA._id);
        expect(ProjectModel.findById).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB create throws', async () => {
        // arrange - simulate DB error
        (ProjectModel.findById as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const req = new Request(
            `http://localhost/api/projects/${dbProjectA._id}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // act
        const res = await PROJECT_GET_BY_ID(req, {
            params: { id: dbProjectA._id }
        });
        const body = await res.json();
        expect(res.status).toBe(500);
        expect(body.status).toBe('error');
        expect(ProjectModel.findById).toHaveBeenCalledTimes(1);
    });
});

describe('Projects API - Create a project', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new project and return success', async () => {
        ProjectModel.create.mockResolvedValue({
            ...dbProjectA,
            toObject() {
                // return the plain object shape your route expects
                return { ...dbProjectA };
            }
        });

        const { _id, ...payload } = dbProjectA;

        const req = new Request('http://localhost/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // act
        const res = await POST(req);
        if (!res) throw new Error('No response from POST');
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data._id).toBe(dbProjectA._id);
        expect(ProjectModel.create).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB create throws', async () => {
        // arrange - simulate DB error
        ProjectModel.create.mockRejectedValue(new Error('DB failure'));

        const { _id, ...payload } = dbProjectA;
        const req = new Request('http://localhost/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // act
        const res = await POST(req);
        const body = await res.json();

        // assert
        expect(res.status).toBeGreaterThanOrEqual(500);
        expect(body.status).toBe('error');
        expect(body.message).toBe('DB failure');
        expect(ProjectModel.create).toHaveBeenCalled();
    });
});

describe('Projects API - Update a project', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update an existing project and return success', async () => {
        (ProjectModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                ...dbProjectA,
                name: 'Project Name Updated'
            })
        });

        const { _id, ...payload } = dbProjectA;
        payload.name = 'Project Name Updated';

        const req = new Request(`http://localhost/api/projects/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        // act
        const res = await PUT(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data._id).toBe(dbProjectA._id);
        expect(body.data.name).toBe('Project Name Updated');
        expect(ProjectModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB update throws', async () => {
        // arrange - simulate DB error
        (ProjectModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const { _id, ...payload } = dbProjectA;
        payload.name = 'Project Name Updated';

        const req = new Request(`http://localhost/api/projects/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        // act
        const res = await PUT(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(500);
        expect(body.status).toBe('error');
        expect(ProjectModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
});

describe('Projects API - Delete a project', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a project and return success', async () => {
        (ProjectModel.findByIdAndDelete as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                ...dbProjectA
            })
        });

        const _id = dbProjectA._id;
        const req = new Request(`http://localhost/api/projects/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        // act
        const res = await DELETE(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data._id).toBe(dbProjectA._id);
        expect(ProjectModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB update throws', async () => {
        // arrange - simulate DB error
        (ProjectModel.findByIdAndDelete as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const { _id, ...payload } = dbProjectA;
        payload.name = 'Project Name Updated';

        const req = new Request(`http://localhost/api/projects/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        // act
        const res = await DELETE(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(500);
        expect(body.status).toBe('error');
        expect(ProjectModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
});
