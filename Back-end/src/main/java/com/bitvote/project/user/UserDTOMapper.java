package com.bitvote.project.user;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserResponse> {

        @Override
        public UserResponse apply(User user) {
            return new UserResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    user.getImageUrl(),
                    user.getAge(),
                    user.getPhone()
            );
        }
}
