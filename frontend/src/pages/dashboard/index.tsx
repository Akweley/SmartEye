import { useLocation } from "react-router-dom";
import useQueryContract from "./hooks/useQueryContract";
import { useState } from "react";
import FullPageLoader from "@/components/molecules/FullPageLoader";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import Layout from "./components/Layout";
import Transactions, { Transaction } from "./components/Transactions";

import transactions from "@/database/index.json";

export default function AdminPage() {
  const location = useLocation();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  //   const { loading, contract } = useQueryContract(location.state.address);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const loading = false;

  return (
    <>
      {loading ? (
        <FullPageLoader />
      ) : (
        <Layout>
          <div className="flex-1 space-y-12">
            <div className="flex flex-col gap-6 md:flex-row items-center md:justify-between ">
              <h2 className="text-5xl font-bold tracking-tight text-black text-center md:text-left">
                Dashboard
              </h2>
            </div>
            <div className="">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Registration Number
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9918b3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {location.state.regNo}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Name of Institution
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9918b3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {location.state.name}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Number of Students
                    </CardTitle>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9918b3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {/* {Number(studentCount)} */}
                      Active
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <Transactions
            data={transactions as Transaction[]}
            onRowSelect={(row) => {
              setIsModalOpen(true);
              setSelectedTransaction(row);
            }}
          />
        </Layout>
      )}
    </>
  );
}
