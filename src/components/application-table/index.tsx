import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Eye, Trash2 } from "lucide-react"

// Sample data for the table
const applications = [
    {
        id: 1,
        applicantName: "John Doe",
        initiatedAt: "2023-05-01T09:00:00Z",
        status: "Pending",
    },
    {
        id: 2,
        applicantName: "Jane Smith",
        initiatedAt: "2023-05-02T14:30:00Z",
        status: "Approved",
    },
    {
        id: 3,
        applicantName: "Bob Johnson",
        initiatedAt: "2023-05-03T11:15:00Z",
        status: "Rejected",
    },
    {
        id: 4,
        applicantName: "Alice Brown",
        initiatedAt: "2023-05-04T16:45:00Z",
        status: "Under Review",
    },
]

export default function ApplicationsTable() {
    // Function to format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString()
    }

    return (
        <Table>
            <TableCaption>A list of recent applications</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Initiated At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applications.map((application) => (
                    <TableRow key={application.id}>
                        <TableCell>{application.id}</TableCell>
                        <TableCell>{application.applicantName}</TableCell>
                        <TableCell>{formatDate(application.initiatedAt)}</TableCell>
                        <TableCell>{application.status}</TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
