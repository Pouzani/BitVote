package com.bitvote.project.user;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;

    public UserService(UserRepository userRepository, UserDTOMapper userDTOMapper) {
        this.userRepository = userRepository;
        this.userDTOMapper = userDTOMapper;
    }

    public List<UserResponse> getAllUsers(){
        return userRepository.findAll().stream().map(userDTOMapper).toList();
    }

    public UserResponse getUserById(Long id){
        return userRepository.findById(id).map(userDTOMapper).orElseThrow();
    }

    public UserResponse getUserByUsername(String username){
        return userRepository.findByUsername(username).map(userDTOMapper).orElseThrow();
    }

    public List<UserResponse> searchUsers(String search){
        return userRepository.findAllByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(search,search)
                .orElseThrow().stream().map(userDTOMapper).toList();
    }

    public UserResponse updateUser(User user){
        if(!userRepository.existsById(user.getId())){
            throw new IllegalStateException("User with id " + user.getId() + " was not found");
        }
        return userDTOMapper.apply(userRepository.save(user));
    }

    public void deleteUser(Long id){
        if(!userRepository.existsById(id)){
            throw new IllegalStateException("User with id " + id + " was not found");
        }
        userRepository.deleteById(id);
    }
}
