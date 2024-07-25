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

bool detect(Node *root)
{
    if (!root || !root->next)
        return 0;
    if (root->next == root)
        return 1;
    Node* slow = root;
    Node* fast = root;
    while(fast and fast->next){
        slow = slow->next;
        fast = fast ->next ->next;
        if(slow == fast)
            return true; 
    }
    return false;
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
    return 0;
}