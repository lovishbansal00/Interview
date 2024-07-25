#include <bits/stdc++.h>
using namespace std;

class Node
{
public:
    int val;
    Node *next;
    Node()
    {
        this->val = 0;
        this->next = NULL;
    }
    Node(int x)
    {
        this->val = x;
        this->next = nullptr;
    }
};

Node *reverse(Node *root)
{
    if (!root || !root->next)
        return root;
    Node *curr = root;
    Node *prev = NULL;
    while (curr->next)
    {
        Node *tmp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = tmp;
    }
    curr->next = prev;
    
    return curr;
}

int main()
{
    cout << "Enter the number of nodes: ";
    int n;
    cin >> n;
    cout << "Enter the values of the nodes: \n";
    Node *root = new Node();
    Node *curr = root;
    for (int i = 0; i < n; i++)
    {
        int x;
        cin >> x;
        Node *tmp = new Node(x);
        curr->next = tmp;
        curr = curr->next;
    }
    curr = reverse(root->next);
    while(curr){
        cout << curr->val << " ";
        curr = curr->next;
    }
    return 0;
}