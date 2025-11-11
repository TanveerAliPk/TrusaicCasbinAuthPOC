import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CasbinDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("policies");

  // Policies
  const { data: policiesData, isLoading: policiesLoading, refetch: refetchPolicies } = trpc.casbin.getPolicies.useQuery();
  const addPolicyMutation = trpc.casbin.addPolicy.useMutation({
    onSuccess: () => {
      toast.success("Policy added successfully");
      refetchPolicies();
      setNewPolicy({ subject: "", object: "", action: "", effect: "allow" });
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });
  const deletePolicyMutation = trpc.casbin.deletePolicy.useMutation({
    onSuccess: () => {
      toast.success("Policy deleted successfully");
      refetchPolicies();
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  // Access Check
  const [accessCheckInput, setAccessCheckInput] = useState({ subject: "", object: "", action: "" });
  const { data: accessCheckResult, refetch: checkAccess, isLoading: accessCheckLoading } = trpc.casbin.checkAccess.useQuery(
    accessCheckInput,
    { enabled: false }
  );

  // Resources
  const { data: resources, isLoading: resourcesLoading, refetch: refetchResources } = trpc.casbin.getResources.useQuery();
  const createResourceMutation = trpc.casbin.createResource.useMutation({
    onSuccess: () => {
      toast.success("Resource created successfully");
      refetchResources();
      setNewResource({ name: "", resourceType: "", department: "", classification: "public" });
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  // User Attributes
  const { data: users, isLoading: usersLoading } = trpc.casbin.getUsers.useQuery();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: userAttributes, refetch: refetchUserAttributes } = trpc.casbin.getUserAttributes.useQuery(
    { userId: selectedUserId || 0 },
    { enabled: selectedUserId !== null }
  );
  const setUserAttributeMutation = trpc.casbin.setUserAttribute.useMutation({
    onSuccess: () => {
      toast.success("Attribute updated successfully");
      if (selectedUserId) {
        refetchUserAttributes();
      }
    },
    onError: (error) => toast.error(`Error: ${error.message}`),
  });

  // Form states
  const [newPolicy, setNewPolicy] = useState({ subject: "", object: "", action: "", effect: "allow" });
  const [newResource, setNewResource] = useState({ name: "", resourceType: "", department: "", classification: "public" });
  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" });

  const handleAddPolicy = () => {
    if (!newPolicy.subject || !newPolicy.object || !newPolicy.action) {
      toast.error("Please fill in all fields");
      return;
    }
    addPolicyMutation.mutate(newPolicy);
  };

  const handleCreateResource = () => {
    if (!newResource.name || !newResource.resourceType) {
      toast.error("Please fill in required fields");
      return;
    }
    createResourceMutation.mutate(newResource);
  };

  const handleSetAttribute = () => {
    if (!selectedUserId || !newAttribute.key || !newAttribute.value) {
      toast.error("Please select user and fill in attribute fields");
      return;
    }
    setUserAttributeMutation.mutate({
      userId: selectedUserId,
      attributeKey: newAttribute.key,
      attributeValue: newAttribute.value,
    });
    setNewAttribute({ key: "", value: "" });
  };

  const handleCheckAccess = () => {
    if (!accessCheckInput.subject || !accessCheckInput.object || !accessCheckInput.action) {
      toast.error("Please fill in all fields");
      return;
    }
    checkAccess();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access the Casbin POC dashboard</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Casbin RBAC/ABAC POC</h1>
          <p className="text-slate-600">Hybrid Authorization Policy Management and Testing</p>
          {user && <p className="text-sm text-slate-500 mt-2">Logged in as: <strong>{user.name || user.email || "User"}</strong></p>}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="access-check">Access Check</TabsTrigger>
          </TabsList>

          {/* Policies Tab */}
          <TabsContent value="policies">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Policy Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Subject</label>
                    <Input
                      placeholder="e.g., user1, admin"
                      value={newPolicy.subject}
                      onChange={(e) => setNewPolicy({ ...newPolicy, subject: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Object</label>
                    <Input
                      placeholder="e.g., resource1, /api/data"
                      value={newPolicy.object}
                      onChange={(e) => setNewPolicy({ ...newPolicy, object: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Action</label>
                    <Input
                      placeholder="e.g., read, write, delete"
                      value={newPolicy.action}
                      onChange={(e) => setNewPolicy({ ...newPolicy, action: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Effect</label>
                    <select
                      value={newPolicy.effect}
                      onChange={(e) => setNewPolicy({ ...newPolicy, effect: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                    >
                      <option value="allow">Allow</option>
                      <option value="deny">Deny</option>
                    </select>
                  </div>
                  <Button
                    onClick={handleAddPolicy}
                    disabled={addPolicyMutation.isPending}
                    className="w-full"
                  >
                    {addPolicyMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add Policy"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Policies List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Current Policies</CardTitle>
                  <CardDescription>RBAC and ABAC policy rules</CardDescription>
                </CardHeader>
                <CardContent>
                  {policiesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                    </div>
                  ) : policiesData?.policies && policiesData.policies.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {policiesData.policies.map((policy, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">
                              {policy[0]} → {policy[1]} : {policy[2]}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              <Badge variant={policy[3] === "allow" ? "default" : "destructive"}>
                                {policy[3]}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePolicyMutation.mutate({ id: idx })}
                            disabled={deletePolicyMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">No policies defined yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Resource Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Resource
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Name</label>
                    <Input
                      placeholder="Resource name"
                      value={newResource.name}
                      onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Type</label>
                    <Input
                      placeholder="e.g., document, database"
                      value={newResource.resourceType}
                      onChange={(e) => setNewResource({ ...newResource, resourceType: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Department</label>
                    <Input
                      placeholder="e.g., Engineering, Sales"
                      value={newResource.department}
                      onChange={(e) => setNewResource({ ...newResource, department: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Classification</label>
                    <select
                      value={newResource.classification}
                      onChange={(e) => setNewResource({ ...newResource, classification: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                    >
                      <option value="public">Public</option>
                      <option value="internal">Internal</option>
                      <option value="confidential">Confidential</option>
                      <option value="secret">Secret</option>
                    </select>
                  </div>
                  <Button
                    onClick={handleCreateResource}
                    disabled={createResourceMutation.isPending}
                    className="w-full"
                  >
                    {createResourceMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Resource"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Resources List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Available resources in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  {resourcesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                    </div>
                  ) : resources && resources.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {resources.map((resource) => (
                        <div key={resource.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-slate-900">{resource.name}</div>
                              <div className="text-xs text-slate-500 mt-1">
                                Type: <Badge variant="outline">{resource.resourceType}</Badge>
                                {resource.department && (
                                  <>
                                    {" "}
                                    Dept: <Badge variant="outline">{resource.department}</Badge>
                                  </>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                Classification:{" "}
                                <Badge
                                  variant={
                                    resource.classification === "public"
                                      ? "secondary"
                                      : resource.classification === "confidential"
                                      ? "destructive"
                                      : "default"
                                  }
                                >
                                  {resource.classification}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">No resources created yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attributes Tab */}
          <TabsContent value="attributes">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Set Attribute Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Set User Attribute
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Select User</label>
                    <select
                      value={selectedUserId || ""}
                      onChange={(e) => setSelectedUserId(e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                    >
                      <option value="">Choose a user...</option>
                      {usersLoading ? (
                        <option disabled>Loading users...</option>
                      ) : users && users.length > 0 ? (
                        users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name || u.email || `User ${u.id}`}
                          </option>
                        ))
                      ) : (
                        <option disabled>No users available</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Attribute Key</label>
                    <Input
                      placeholder="e.g., department, level"
                      value={newAttribute.key}
                      onChange={(e) => setNewAttribute({ ...newAttribute, key: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Attribute Value</label>
                    <Input
                      placeholder="e.g., Engineering, Senior"
                      value={newAttribute.value}
                      onChange={(e) => setNewAttribute({ ...newAttribute, value: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleSetAttribute}
                    disabled={setUserAttributeMutation.isPending}
                    className="w-full"
                  >
                    {setUserAttributeMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Setting...
                      </>
                    ) : (
                      "Set Attribute"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* User Attributes List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>User Attributes</CardTitle>
                  <CardDescription>
                    {selectedUserId ? `Attributes for selected user` : "Select a user to view attributes"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedUserId === null ? (
                    <p className="text-slate-500 text-sm">Select a user to view their attributes</p>
                  ) : userAttributes && userAttributes.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {userAttributes.map((attr) => (
                        <div key={attr.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-sm font-medium text-slate-900">{attr.attributeKey}</div>
                          <div className="text-sm text-slate-600 mt-1">{attr.attributeValue}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">No attributes set for this user</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Access Check Tab */}
          <TabsContent value="access-check">
            <Card>
              <CardHeader>
                <CardTitle>Access Control Checker</CardTitle>
                <CardDescription>Test if a subject can perform an action on an object</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Subject</label>
                      <Input
                        placeholder="e.g., user1, admin"
                        value={accessCheckInput.subject}
                        onChange={(e) => setAccessCheckInput({ ...accessCheckInput, subject: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Object</label>
                      <Input
                        placeholder="e.g., resource1, /api/data"
                        value={accessCheckInput.object}
                        onChange={(e) => setAccessCheckInput({ ...accessCheckInput, object: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Action</label>
                      <Input
                        placeholder="e.g., read, write, delete"
                        value={accessCheckInput.action}
                        onChange={(e) => setAccessCheckInput({ ...accessCheckInput, action: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleCheckAccess} disabled={accessCheckLoading} className="w-full">
                      {accessCheckLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        "Check Access"
                      )}
                    </Button>
                  </div>

                  {/* Result */}
                  <div className="flex items-center justify-center">
                    {accessCheckResult ? (
                      <div
                        className={`text-center p-8 rounded-lg border-2 ${
                          accessCheckResult.allowed
                            ? "bg-green-50 border-green-300"
                            : "bg-red-50 border-red-300"
                        }`}
                      >
                        {accessCheckResult.allowed ? (
                          <>
                            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                            <div className="text-2xl font-bold text-green-900 mb-2">Access Allowed</div>
                            <div className="text-sm text-green-700">
                              {accessCheckInput.subject} can {accessCheckInput.action} {accessCheckInput.object}
                            </div>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                            <div className="text-2xl font-bold text-red-900 mb-2">Access Denied</div>
                            <div className="text-sm text-red-700">
                              {accessCheckInput.subject} cannot {accessCheckInput.action} {accessCheckInput.object}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-8 text-slate-500">
                        <div className="text-lg font-medium mb-2">No result yet</div>
                        <div className="text-sm">Fill in the form and click "Check Access" to test authorization</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
