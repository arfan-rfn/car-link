package com.example.carlink.CarLinkAPI.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange("topicExchange");
    }

    @Bean
    public Queue signupQueue() {
        return new Queue("user.signup.queue", true);
    }

    @Bean
    public Queue registerQueue() {
        return new Queue("user.registration.queue", true);
    }

    @Bean
    public Binding bindingSignup(TopicExchange exchange, Queue signupQueue) {
        return BindingBuilder.bind(signupQueue).to(exchange).with("user.signup.#");
    }

    @Bean
    public Binding bindingLogin(TopicExchange exchange, Queue registerQueue) {
        return BindingBuilder.bind(registerQueue).to(exchange).with("user.registration.#");
    }
}
