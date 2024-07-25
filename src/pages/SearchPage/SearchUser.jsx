import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, List, Avatar, AutoComplete, message } from 'antd';
import MenuComponent from '../../components/Menu/MenuComponent';
import { searchUserByName } from '../../api/api';

const { Search } = Input;

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Handle the search action
    const handleSearchButtonClick = async () => {
        if (!searchValue) return;

        setLoading(true);
        try {
            const response = await searchUserByName(searchValue);
            setResults(response.data); // Update search results
        } catch (error) {
            console.error('Search error:', error);
            message.error('Failed to perform search.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch suggestions based on the search input
    const handleSearch = async (value) => {
        setSearchValue(value);
        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const response = await searchUserByName(value);
            console.log('sss', response);
            setSuggestions(response.data.map(user => ({
                value: user.name,
                key: user._id,
                avatar: `http://localhost:5000/${user.avatarUrl}`,
                id: user._id
            })));
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            message.error('Failed to fetch suggestions.');
        } finally {
            setLoading(false);
        }
    };

    // Navigate to profile page when a suggestion is selected
    const handleSelect = (value) => {
        const selectedUser = suggestions.find(user => user.value === value);
        console.log("vvvv", selectedUser.id);
        if (selectedUser) {
            navigate(`/profile/${selectedUser.id}`);
        }
    };

    return (
        <div className="home-page-container" style={{ display: 'flex' }}>
            <MenuComponent mode="inline" selectedKey="8" />
            <div style={{ flex: 1, padding: '20px' }}>
                <AutoComplete
                    options={suggestions.map(suggestion => ({
                        value: suggestion.value,
                        label: (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={suggestion.avatar} style={{ marginRight: 8 }} />
                                {suggestion.value}
                            </div>
                        ),
                        key: suggestion.key
                    }))}
                    onChange={handleSearch}
                    onSelect={handleSelect} // Navigate to profile when an option is selected
                    style={{ width: '80%' }}
                >
                    <Search
                        placeholder="Nhập tên người dùng"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="large"
                        onSearch={handleSearchButtonClick} // Handle search button click
                    />
                </AutoComplete>
                <h2>Danh sách người dùng</h2>
                {loading && <div>Loading...</div>}
                <div>
                    {results.length > 0 ? (
                        <List
                            dataSource={results}
                            renderItem={user => (
                                <List.Item
                                    key={user._id}
                                    onClick={() => navigate(`/profile/${user._id}`)} // Navigate to profile page on item click
                                    style={{ cursor: 'pointer' }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={`http://localhost:5000/${user.avatarUrl}`} />}
                                        title={user.name}
                                    />
                                </List.Item>
                            )}
                        />
                    ) : (
                        !loading && <p>Không tìm thấy kết quả nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
